#!/usr/bin/env python3
"""
Daily eCFR amendment checker for the Part 135 Transition study site.

Queries the public eCFR Versioner API for the latest amendment date of each
tracked section, compares it against the baseline (regsValidFrom) recorded in
data/status.json, and rewrites data/status.json accordingly.

- status: "current"  -> no tracked section amended after the baseline
- status: "changed"  -> one or more tracked sections amended after the baseline
- status: "warn"     -> the check could not reach eCFR (network/API error)

The static site's refresh button reads the committed data/status.json, so this
script is what keeps the on-page reg-validity banner honest. Run by the daily
GitHub Action (.github/workflows/check-ecfr.yml).
"""
import json
import os
import sys
import datetime
import urllib.request
import urllib.error

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
STATUS_PATH = os.path.join(ROOT, "data", "status.json")

# Tracked sections grouped by CFR part. These mirror the verbatim sections
# quoted in the study guide (data/regs.json).
TRACKED = {
    "61":  ["61.23"],
    "67":  ["67.3"],
    "119": ["119.71"],
    "135": ["135.205", "135.221", "135.223", "135.225",
            "135.243", "135.244", "135.245", "135.247",
            "135.261", "135.265", "135.267",
            "135.293", "135.297", "135.299"],
}

API = "https://www.ecfr.gov/api/versioner/v1/versions/title-14.json?part={part}"
UA = {"User-Agent": "part135-transition-site/1.0 (eCFR amendment checker)"}
TIMEOUT = 30


def fetch_part_versions(part):
    """Return {section_identifier: latest_amendment_date_str} for a CFR part."""
    url = API.format(part=part)
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        data = json.loads(r.read().decode("utf-8"))
    latest = {}
    for v in data.get("content_versions", []):
        ident = v.get("identifier")
        amd = v.get("amendment_date") or v.get("date")
        if not ident or not amd:
            continue
        if ident not in latest or amd > latest[ident]:
            latest[ident] = amd
    return latest


def load_status():
    with open(STATUS_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def main():
    status = load_status()
    baseline = status.get("regsValidFrom", "2026-05-01")
    today = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT00:00:00Z")

    changes = []
    errors = []

    for part, sections in TRACKED.items():
        try:
            latest = fetch_part_versions(part)
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, ValueError) as e:
            errors.append(f"part {part}: {e}")
            continue
        for sec in sections:
            amd = latest.get(sec)
            if amd is None:
                # Section not found in version feed; note but don't fail hard.
                errors.append(f"section {sec}: no version data returned")
                continue
            if amd > baseline:
                changes.append({"section": sec, "amendedOn": amd})

    status["lastChecked"] = today

    if errors and not changes:
        # Couldn't fully verify -> warn, but keep prior known-good baseline.
        status["status"] = "warn"
        status["note"] = ("Automated check could not fully reach eCFR. "
                          "Showing last known baseline. Errors: "
                          + "; ".join(errors[:5]))
        status["changes"] = []
    elif changes:
        status["status"] = "changed"
        status["changes"] = sorted(changes, key=lambda c: c["amendedOn"], reverse=True)
        secs = ", ".join("§" + c["section"] for c in status["changes"])
        status["note"] = (f"{len(changes)} tracked section(s) amended after the "
                         f"baseline ({baseline}): {secs}. Re-verify these against "
                         "the live eCFR and update the study materials.")
    else:
        status["status"] = "current"
        status["changes"] = []
        status["note"] = ("Automated daily check: no tracked section has been "
                         f"amended after the baseline ({baseline}).")

    with open(STATUS_PATH, "w", encoding="utf-8") as f:
        json.dump(status, f, indent=2)
        f.write("\n")

    print(f"status={status['status']} changes={len(status['changes'])} "
          f"errors={len(errors)} lastChecked={status['lastChecked']}")
    # Never fail the workflow on a "changed" result; only fail on total breakage
    # is undesirable too (we already wrote warn). Always exit 0 so the commit step runs.
    return 0


if __name__ == "__main__":
    sys.exit(main())
