/* ============================================================
   Part 135 Transition — app logic
   ============================================================ */
(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;};

/* ---------- theme toggle ---------- */
(function(){
  const t=$('[data-theme-toggle]'),r=document.documentElement;
  let d=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
  r.setAttribute('data-theme',d);
  const paint=()=>{t.innerHTML=d==='dark'
    ?'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>'
    :'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
    t.setAttribute('aria-label','Switch to '+(d==='dark'?'light':'dark')+' mode');};
  paint();
  t.addEventListener('click',()=>{d=d==='dark'?'light':'dark';r.setAttribute('data-theme',d);paint();});
})();

/* ---------- navigation ---------- */
const VIEWS=['learn','diagrams','poa','currency','study','regs'];
function go(view){
  if(!VIEWS.includes(view))view='learn';
  $$('.view').forEach(v=>v.classList.toggle('hidden',v.dataset.view!==view));
  $$('.navlink').forEach(n=>n.classList.toggle('active',n.dataset.go===view));
  $('.mainnav').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
  history.replaceState(null,'','#'+view);
}
$$('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
$('.menubtn').addEventListener('click',function(){
  const n=$('.mainnav');const open=n.classList.toggle('open');
  this.setAttribute('aria-expanded',open);
});

/* ============================================================
   STUDY GUIDE content
   ============================================================ */
const LEARN=[
 {tag:'MODEL',title:'The Mental Model — how the parts stack',sub:'Fly to the most restrictive layer',html:`
   <p>Coming from Part 91, the single biggest mindset shift: <strong>Part 135 does not replace Part 91 — it layers on top of it.</strong> You still comply with the Part 91 general operating rules unless a Part 135 rule is more restrictive, in which case 135 wins. On top of that, your operator's <strong>OpSpecs</strong> and <strong>GOM</strong> can be more restrictive still.</p>
   <div class="callout teal"><strong>Rule of thumb:</strong> comply with EVERY applicable layer — Parts 61/67 (you, the airman) → Part 91 (the floor) → Part 135 (the commercial layer) → OpSpecs → company manual. Fly to the tightest limit.</div>
   <h4>The Part 91 pilot's biggest surprises</h4>
   <ul>
     <li>You no longer self-certify currency — the <strong>company</strong> tracks and authorizes you via the 135 checks.</li>
     <li>Hard <strong>flight-time and rest limits</strong> (135.267) now constrain your day, not just good judgment.</li>
     <li>Higher <strong>weather minimums</strong> and <strong>alternate</strong> requirements than you used under 91.</li>
     <li>You must pass recurring <strong>.293 / .297 / .299</strong> checks and know Parts 61, 91, and 135 plus the company manual.</li>
     <li>The aircraft, routes, and even you are authorized by name/OpSpec — not just by your logbook.</li>
   </ul>`},
 {tag:'PART 61',title:'Part 61 — Certification of Pilots',sub:'Certificates, ratings & the experience floor',html:`
   <p>Part 61 is about <strong>you</strong> — the certificates, ratings, and recency that let you act as a crewmember. Nothing in your private/commercial training disappears, but Part 135 sets a higher experience <em>floor</em> before the operator may use you.</p>
   <div class="tablewrap"><table><thead><tr><th>Certificate</th><th>Typical 135 role</th><th>Key reference</th></tr></thead><tbody>
     <tr><td>Commercial (CPL)</td><td>PIC of VFR ops &amp; many on-demand IFR ops; SIC</td><td>61.123–61.133</td></tr>
     <tr><td>Instrument rating</td><td>Required for essentially all turbine 135 IFR flying</td><td>61.65</td></tr>
     <tr><td>Multi-engine class</td><td>Required for ME turbine aircraft</td><td>61.63, 61.31</td></tr>
     <tr><td>Type rating</td><td>Required for turbojet / &gt;12,500 lb aircraft</td><td>61.31(a)</td></tr>
     <tr><td>ATP</td><td>PIC of turbojet / scheduled / larger ops; often required by OpSpec</td><td>61.153–61.167</td></tr>
   </tbody></table></div>
   <div class="callout"><strong>Key point for your transition:</strong> for a turbojet you'll hold a <strong>type rating</strong> (61.31). Many 135 turbojet/turboprop PIC seats also require an <strong>ATP</strong> by OpSpec or by the "1,500-hour" alternate-currency path in 135.247. The 61.58 PIC proficiency check is generally satisfied by your 135 .293/.297 checks — and your flight review / IPC are typically subsumed by the recurring 135 checks once you're an active crewmember.</div>`},
 {tag:'PART 67',title:'Part 67 — Medical Standards & Certification',sub:'Which class, and how long it lasts',html:`
   <p>Part 67 defines the medical classes and standards for each; <strong>61.23</strong> tells you which class you need and how long it lasts. In the 135 turbine world you'll almost always need at least a <strong>second-class</strong> medical (commercial privileges), and a <strong>first-class</strong> if you exercise ATP PIC privileges.</p>
   <div class="tablewrap"><table><thead><tr><th>Class</th><th>Needed for</th><th>Under 40</th><th>40 &amp; over</th></tr></thead><tbody>
     <tr><td>First</td><td>ATP PIC privileges (commercial remain valid 12 mo)</td><td>12 months</td><td>6 months</td></tr>
     <tr><td>Second</td><td>Commercial pilot privileges (most 135 PIC/SIC)</td><td>12 months</td><td>12 months</td></tr>
     <tr><td>Third</td><td>Private/recreational/student — not commercial 135</td><td>60 months</td><td>24 months</td></tr>
   </tbody></table></div>
   <div class="callout"><strong>Scheduling tip:</strong> if you're 40+ and fly ATP PIC turbojet, you need a first-class every 6 months — build it into your recurrent rhythm. The medical expires the last day of the month; book the exam late in the month to maximize validity (61.23).</div>`},
 {tag:'91 vs 135',title:'Part 91 vs Part 135 — what actually changes',sub:'The diff between the world you know and the new one',html:`
   <p>You already know Part 91 cold. This is the "diff" — where 135 tightens the screws.</p>
   <div class="tablewrap"><table><thead><tr><th>Topic</th><th>Part 91 (what you know)</th><th>Part 135 (the new layer)</th></tr></thead><tbody>
     <tr><td>Operational control</td><td>Pilot/owner decides</td><td>Certificate holder retains operational control; releases &amp; authorizations required</td></tr>
     <tr><td>Currency</td><td>Self-tracked (61.57)</td><td>Company tracks; .293/.297/.299 checks; 135.247 recency</td></tr>
     <tr><td>Duty &amp; rest</td><td>None (good judgment)</td><td>Hard limits — 135.261/.267</td></tr>
     <tr><td>VFR weather</td><td>Class-airspace minimums</td><td>Higher floors; 135.205 ceiling/vis for pax</td></tr>
     <tr><td>IFR alternate</td><td>1-2-3 rule (91.167)</td><td>Stricter — 135.223 plus derived alt mins (135.221/.225)</td></tr>
     <tr><td>Takeoff mins</td><td>None for Part 91 (non-commercial)</td><td>Must meet 135.225 / OpSpec takeoff mins</td></tr>
     <tr><td>Recordkeeping</td><td>Minimal</td><td>Flight/duty 12 mo, load manifests, releases, training records</td></tr>
   </tbody></table></div>`},
 {tag:'PART 119',title:'Part 119 — Certifying the Air Carrier',sub:'Who needs a certificate, and what kind',html:`
   <p>Part 119 answers "who needs a certificate, and what kind?" As a pilot you mostly care about how it shapes your operator; as an operator it's the front door to the whole certificate.</p>
   <div class="tablewrap"><table><thead><tr><th>Kind</th><th>Seats / aircraft limits</th><th>Notes</th></tr></thead><tbody>
     <tr><td>On-demand</td><td>Airplanes ≤30 seats or ≤7,500 lb payload; any rotorcraft</td><td>Charter; turbojets allowed</td></tr>
     <tr><td>Commuter</td><td>Airplanes ≤9 seats &amp; ≤7,500 lb payload; any rotorcraft</td><td>Scheduled; <strong>no turbojet</strong></td></tr>
   </tbody></table></div>
   <p>Your turbojet operation will therefore be an <strong>on-demand</strong> certificate — commuter authority can't carry turbojets. Scope is then set by OpSpecs (single-pilot, single-PIC, Basic, or Standard).</p>
   <div class="callout"><strong>Required management (119.71):</strong> Director of Operations, Chief Pilot, Director of Maintenance — with experience standards that scale with the kind of operation. Some Basic/single-pilot operators may be relieved of designating these.</div>`},
 {tag:'135 CHECKS',title:'Part 135 — Pilot Requirements, Training & Checks',sub:'The .293 / .297 / .299 trio',html:`
   <p>This is the heart of your transition. Subpart E says who may serve; Subpart F sets duty &amp; rest; the famous trio — <strong>.293, .297, .299</strong> — is what "makes you legal" at a 135 shop.</p>
   <div class="tablewrap"><table><thead><tr><th>Check</th><th>What it is</th><th>Who / how often</th></tr></thead><tbody>
     <tr><td>135.293(a)</td><td>Written/oral knowledge test (Parts 61/91/135, OpSpecs, manual, aircraft)</td><td>All pilots — every 12 calendar months</td></tr>
     <tr><td>135.293(b)</td><td>Competency check in the aircraft — normal &amp; abnormal procedures</td><td>All pilots — every 12 calendar months</td></tr>
     <tr><td>135.297</td><td>Instrument proficiency check — approaches, holds, missed</td><td>IFR PIC — every 6 calendar months (may substitute for .293(b))</td></tr>
     <tr><td>135.299</td><td>Line check — observed normal line flight; designates PIC</td><td>PIC — every 12 calendar months</td></tr>
   </tbody></table></div>
   <div class="callout teal"><strong>How it interlocks:</strong> because the .297 IPC (every 6 mo) can substitute for the .293(b) competency check, IFR PICs effectively cycle a check every 6 months. All intervals are <strong>calendar-month</strong> based — due by the last day of the month, like your medical.</div>
   <h4>Experience &amp; recency to serve as PIC (Subpart E)</h4>
   <div class="tablewrap"><table><thead><tr><th>Item</th><th>PIC – IFR (135.243(c))</th><th>PIC – VFR (135.243(b))</th></tr></thead><tbody>
     <tr><td>Total time</td><td>1,200 hr</td><td>500 hr</td></tr>
     <tr><td>Cross-country</td><td>500 hr</td><td>100 hr</td></tr>
     <tr><td>Night</td><td>100 hr</td><td>25 hr</td></tr>
     <tr><td>Instrument</td><td>75 hr (≤50 simulated)</td><td>—</td></tr>
   </tbody></table></div>
   <ul>
     <li><strong>SIC (135.245):</strong> commercial + instrument rating; IFR SIC needs 6 instrument approaches + course-tracking within the preceding 6 months.</li>
     <li><strong>Operating experience (135.244):</strong> turbojet 25 hr · ME turbine 20 · ME recip 15 · single 10 (reducible 50%).</li>
     <li><strong>Recency (135.247):</strong> 3 takeoffs/landings in category/class/type within 90 days; turbine multi-crew jets have a 1,500-hr / 15-hr-in-type currency path.</li>
   </ul>`},
 {tag:'DUTY/REST',title:'Part 135 — Flight Time, Duty & Rest',sub:'135.267 hard limits',html:`
   <p>For an unscheduled (on-demand) one- or two-pilot crew — the typical turbojet charter setup — <strong>135.267</strong> is your governing rule. These are hard limits, not guidelines.</p>
   <div class="tablewrap"><table><thead><tr><th>Limit type</th><th>One pilot</th><th>Two pilots</th></tr></thead><tbody>
     <tr><td>Max flight time in 24 consecutive hrs</td><td>8 hr</td><td>10 hr</td></tr>
     <tr><td>Required rest in the 24 hr before completion</td><td>≥ 10 consecutive hr</td><td>≥ 10 consecutive hr</td></tr>
     <tr><td>Quarterly cap (all commercial flying)</td><td>500 hr / quarter</td><td>500 hr / quarter</td></tr>
     <tr><td>Two-quarter cap</td><td>800 hr</td><td>800 hr</td></tr>
     <tr><td>Annual cap</td><td>1,400 hr / yr</td><td>1,400 hr / yr</td></tr>
   </tbody></table></div>
   <div class="callout"><strong>The rules that trip people up:</strong> the operator must give each crewmember at least <strong>13 rest periods of 24 hr</strong> per calendar quarter (135.267(f)); the required 10-hr rest is <strong>look-back</strong> rest measured in the 24 hr preceding completion of the assignment — not just before you start.</div>`},
 {tag:'OPSPECS',title:"OpSpecs — the operator's rulebook",sub:'The FAA-approved contract',html:`
   <p>Operations Specifications are the FAA-approved "contract" that defines exactly what your company may do — aircraft, areas, authorizations, and limits. They're lettered by subject (A, B, C, D…). As a line pilot you'll reference C-series approach authorizations constantly.</p>
   <div class="tablewrap"><table><thead><tr><th>Series</th><th>Covers</th><th>Examples</th></tr></thead><tbody>
     <tr><td>A</td><td>General — issuance, authorizations, definitions</td><td>A001 issuance; A039/A040 single-PIC/pilot; A057 eligible on-demand</td></tr>
     <tr><td>B</td><td>En route authorizations &amp; limitations</td><td>Routes, areas, RNAV/RNP, oceanic</td></tr>
     <tr><td>C</td><td>Airport &amp; approach authorizations</td><td>C055 alternate mins; C075 circling; CAT II/III</td></tr>
     <tr><td>D</td><td>Aircraft maintenance</td><td>MEL, inspection program, CASS</td></tr>
   </tbody></table></div>
   <div class="callout"><strong>Part 91 LOAs → 135 OpSpecs:</strong> under Part 91 you may have flown on Letters of Authorization (e.g. RVSM). Under 135 those same authorizations are baked into OpSpecs and tied to the certificate. OpSpecs frequently set <strong>more restrictive</strong> minimums than the FARs — when they disagree, the OpSpec (or company manual) governs if stricter.</div>`},
];
(function renderLearn(){
  const box=$('#learnBody');
  LEARN.forEach((s,i)=>{
    const acc=el('div','acc'+(i===0?' open':''));
    const head=el('button','acc-head');
    head.innerHTML=`<span class="acc-tag">${s.tag}</span><span class="acc-title">${s.title}<span class="acc-sub">— ${s.sub}</span></span>
      <svg class="acc-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>`;
    const body=el('div','acc-body prose',s.html);
    if(i!==0)body.style.display='none';
    head.addEventListener('click',()=>{
      const open=acc.classList.toggle('open');
      body.style.display=open?'block':'none';
    });
    acc.append(head,body);box.append(acc);
  });
})();

/* ============================================================
   DIAGRAMS
   ============================================================ */
const FIGS=[
 ['01_layer_stack.png','Figure 1. The regulatory stack','Each higher layer adds restrictions — satisfy every applicable layer, flying to the tightest limit.'],
 ['02_cert_tree.png','Figure 2. The cert tree & experience floor','What you must hold and meet to occupy a Part 135 turbine/jet PIC seat.'],
 ['03_currency_calendar.png','Figure 3. 12-month currency calendar','How the recurring checks, recency, and the first-class medical interleave through the year.'],
 ['04_weather_flow.png','Figure 4. IFR weather & alternate decision flow','Destination mins → takeoff-below-mins alternate rule → derived alternate mins → under-100-hr-in-type penalty.'],
 ['05_duty_rest.png','Figure 5. 135.267 duty/rest timeline','Look-back rest of 10+ hours and the 8/10-hour flight-time ceiling within any 24 consecutive hours.'],
 ['06_119_map.png','Figure 6. Part 119 scope map','On-demand vs commuter, the four scopes of certificate, and required management.'],
];
(function renderFigs(){
  const grid=$('#figGrid');
  FIGS.forEach(([f,t,c])=>{
    const fig=el('figure','figure');
    fig.innerHTML=`<img src="diagrams/${f}" alt="${t}" loading="lazy"/><figcaption><b>${t}.</b> ${c}</figcaption>`;
    fig.querySelector('img').addEventListener('click',()=>{
      const lb=el('div','lightbox');lb.innerHTML=`<img src="diagrams/${f}" alt="${t}"/>`;
      lb.addEventListener('click',()=>lb.remove());document.body.append(lb);
    });
    grid.append(fig);
  });
})();

/* ============================================================
   POA BUILDER
   ============================================================ */
const POA=window.SITE.poaTemplates;
(function initPOA(){
  const sel=$('#poaType');
  Object.entries(POA).forEach(([k,v])=>sel.append(new Option(v.label,k)));
  $('#poaDate').value=new Date().toISOString().slice(0,10);
  function render(){
    const t=POA[sel.value];const o=$('#poaOutput');
    const meta=k=>$('#poa'+k).value.trim();
    const head=el('div','poa-doc-head');
    head.innerHTML=`<h3>Plan of Action — ${t.label}</h3>
      <div class="poa-badge"><span>${t.reg}</span><span>${t.cadence}</span><span>${t.who}</span></div>
      <div class="meta">
        <div>Pilot: <b>${meta('Pilot')||'________________'}</b></div>
        <div>Cert #: <b>${meta('Cert')||'__________'}</b></div>
        <div>Aircraft: <b>${meta('Acft')||'________________'}</b></div>
        <div>Date: <b>${meta('Date')||'__________'}</b></div>
        <div>Check airman: <b>${meta('Checkman')||'________________'}</b></div>
        <div>Loc/route: <b>${meta('Loc')||'__________'}</b></div>
      </div>`;
    o.innerHTML='';o.append(head);
    o.append(el('p','poa-desc',t.desc));
    t.sections.forEach((sec,si)=>{
      const s=el('div','poa-sec');s.append(el('h4',null,sec.name));
      sec.items.forEach((it,ii)=>{
        const row=el('label','poa-item');
        row.innerHTML=`<input type="checkbox" id="poa-${si}-${ii}"><span>${it}</span>`;
        s.append(row);
      });
      o.append(s);
    });
    const notes=meta('Notes');
    if(notes){const n=el('div','poa-sec');n.innerHTML=`<h4>Notes</h4><p class="poa-desc">${notes.replace(/</g,'&lt;')}</p>`;o.append(n);}
    const sign=el('div','poa-sign');
    sign.innerHTML=`<div class="line">Pilot signature</div><div class="line">Check airman signature</div>
      <div class="line">Result (Sat / Unsat)</div><div class="line">Training record updated</div>`;
    o.append(sign);
  }
  sel.addEventListener('change',render);
  ['Pilot','Cert','Acft','Date','Checkman','Loc','Notes'].forEach(k=>$('#poa'+k).addEventListener('input',render));
  $('#poaPrint').addEventListener('click',()=>printView('poa'));
  $('#poaReset').addEventListener('click',()=>{
    ['Pilot','Cert','Acft','Checkman','Loc','Notes'].forEach(k=>$('#poa'+k).value='');
    $('#poaDate').value=new Date().toISOString().slice(0,10);render();
  });
  render();
})();

/* ============================================================
   CURRENCY CALCULATOR
   ============================================================ */
const CUR=window.SITE.currencyItems;
(function initCurrency(){
  const rows=$('#curRows');
  // Use either med1 or med1u40 depending on age toggle; show non-age items always
  function buildRows(){
    rows.innerHTML='';
    const under40=$('#curAge').value==='yes';
    CUR.forEach(item=>{
      if(item.key==='med1'&&under40)return;
      if(item.key==='med1u40'&&!under40)return;
      const r=el('div','cur-row');r.dataset.key=item.key;
      const span=item.days?`every ${item.days} days`:`every ${item.months} mo`;
      r.innerHTML=`<div class="cur-label">${item.label}<small>${item.reg} · ${span}</small></div>
        <input type="date" data-key="${item.key}">
        <div class="cur-due" data-due="${item.key}">—</div>`;
      rows.append(r);
    });
    rows.querySelectorAll('input[type=date]').forEach(inp=>inp.addEventListener('input',()=>compute()));
    compute();
  }
  function addMonths(d,m){const x=new Date(d);const day=x.getDate();x.setMonth(x.getMonth()+m);
    // calendar-month rule: due last day of the month it expires
    return x;}
  function lastDayOfMonth(d){return new Date(d.getFullYear(),d.getMonth()+1,0);}
  function compute(){
    const today=new Date();today.setHours(0,0,0,0);
    rows.querySelectorAll('.cur-row').forEach(r=>{
      const key=r.dataset.key;const item=CUR.find(c=>c.key===key);
      const inp=r.querySelector('input');const out=r.querySelector('.cur-due');
      if(!inp.value){out.textContent='—';out.className='cur-due';return;}
      const start=new Date(inp.value+'T00:00:00');
      let due;
      if(item.days){due=new Date(start);due.setDate(due.getDate()+item.days);}
      else{due=lastDayOfMonth(addMonths(start,item.months));}
      const days=Math.round((due-today)/86400000);
      let cls='ok',msg=`${days} days left`;
      if(days<0){cls='over';msg=`OVERDUE ${Math.abs(days)} days`;}
      else if(days<=30){cls='soon';msg=`${days} days left`;}
      out.className='cur-due '+cls;
      out.innerHTML=`Due ${due.toISOString().slice(0,10)}<small>${msg}</small>`;
    });
  }
  $('#curAge').addEventListener('change',buildRows);
  $('#curClear').addEventListener('click',()=>{rows.querySelectorAll('input').forEach(i=>i.value='');compute();});
  $('#curPrint').addEventListener('click',()=>{buildPrint();printView('currency');});
  function buildPrint(){
    const blk=$('#curPrintBlock');const pilot=$('#curPilot').value.trim()||'________________';
    let html=`<div class="card cur-print-doc"><h3>Pilot Currency Plan</h3>
      <p class="fineprint">Pilot: <b>${pilot.replace(/</g,'&lt;')}</b> · Generated ${new Date().toISOString().slice(0,10)} · Calendar-month items due by month-end.</p>
      <div class="tablewrap"><table><thead><tr><th>Item</th><th>Reg</th><th>Last done</th><th>Next due</th><th>Status</th></tr></thead><tbody>`;
    rows.querySelectorAll('.cur-row').forEach(r=>{
      const item=CUR.find(c=>c.key===r.dataset.key);
      const inp=r.querySelector('input');const due=r.querySelector('.cur-due');
      html+=`<tr><td>${item.label}</td><td>${item.reg}</td><td>${inp.value||'—'}</td>
        <td>${due.textContent.replace(/Due /,'').replace(/\d+ days.*/,'')||'—'}</td>
        <td>${due.querySelector('small')?due.querySelector('small').textContent:'—'}</td></tr>`;
    });
    html+=`</tbody></table></div>
      <p class="fineprint" style="margin-top:1rem">Study aid only — verify against company tracking, OpSpecs, and the current regulations.</p></div>`;
    blk.innerHTML=html;
  }
  buildRows();
})();

/* ============================================================
   STUDY TABS
   ============================================================ */
$$('.stab').forEach(b=>b.addEventListener('click',()=>{
  $$('.stab').forEach(x=>x.classList.remove('active'));b.classList.add('active');
  $$('.stab-panel').forEach(p=>p.classList.add('hidden'));
  $('#panel-'+b.dataset.stab).classList.remove('hidden');
}));

/* flashcards */
const FC=window.SITE.flashcards;
(function initFlash(){
  const cats=['All',...new Set(FC.map(c=>c.cat))];
  const catSel=$('#flashCat');cats.forEach(c=>catSel.append(new Option(c,c)));
  let deck=FC.slice(),idx=0;
  const card=$('#flashCard');
  function filter(){const c=catSel.value;deck=c==='All'?FC.slice():FC.filter(x=>x.cat===c);idx=0;show();}
  function show(){
    card.classList.remove('flipped');
    const c=deck[idx];
    $('#flashTagF').textContent=c.cat;$('#flashTagB').textContent=c.cat;
    $('#flashQ').textContent=c.q;$('#flashA').textContent=c.a;$('#flashReg').textContent=c.reg;
    $('#flashCount').textContent=`${idx+1} / ${deck.length}`;
  }
  const flip=()=>card.classList.toggle('flipped');
  card.addEventListener('click',flip);
  card.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();flip();}});
  $('#flashFlip').addEventListener('click',flip);
  $('#flashNext').addEventListener('click',()=>{idx=(idx+1)%deck.length;show();});
  $('#flashPrev').addEventListener('click',()=>{idx=(idx-1+deck.length)%deck.length;show();});
  catSel.addEventListener('change',filter);
  show();
})();

/* quiz */
const QZ=window.SITE.quiz;
(function initQuiz(){
  const body=$('#quizBody');let score=0,answered=0;
  QZ.forEach((q,qi)=>{
    const box=el('div','quiz-q');
    box.innerHTML=`<div class="qn">QUESTION ${qi+1}</div><h4>${q.q}</h4>`;
    const ch=el('div','quiz-choices');
    q.choices.forEach((c,ci)=>{
      const btn=el('button','quiz-choice',`<span>${c}</span>`);
      btn.addEventListener('click',()=>{
        if(box.dataset.done)return;box.dataset.done='1';answered++;
        const correct=ci===q.answer;if(correct)score++;
        ch.children[q.answer].classList.add('correct');
        ch.children[q.answer].insertAdjacentHTML('beforeend','<span class="mk">✓</span>');
        if(!correct){btn.classList.add('wrong');btn.insertAdjacentHTML('beforeend','<span class="mk">✗</span>');}
        const fb=el('div','quiz-feedback',`${correct?'<b>Correct.</b>':'Not quite — '}Reference: <b>${q.reg}</b>`);
        box.append(fb);updateScore();
      });
      ch.append(btn);
    });
    box.append(ch);body.append(box);
  });
  const scoreEl=el('div','quiz-score hidden');body.append(scoreEl);
  function updateScore(){scoreEl.classList.remove('hidden');scoreEl.textContent=`Score: ${score} / ${answered} answered (${QZ.length} total)`;}
})();

/* study methods */
$('#methodsBody').innerHTML=`
  <h4>1. Learn the structure before the numbers</h4>
  <p>Don't memorize regs cold. First internalize the <strong>layer model</strong> (61/67 = you, 91 = floor, 135 = commercial layer, OpSpecs/GOM = company). When you hit a new rule, slot it into the layer — you'll recall it by structure, not rote.</p>
  <h4>2. Build a personal "diff" list</h4>
  <p>You already know Part 91. Make a one-page list of only what changes under 135: duty/rest, weather mins, the +100/½ rule, the check trio, alternates. Study the delta, not the whole body of law.</p>
  <h4>3. Anchor the recurring intervals with a calendar</h4>
  <p>Make a 12-month wall chart (Figure 3) showing medical, .293, .297 (×2), .299, and recency. Seeing them interleave turns abstract intervals into a rhythm — and it's exactly how dispatch thinks.</p>
  <h4>4. Use spaced repetition for the hard numbers</h4>
  <p>Flashcards (this site's deck) for the pure-recall items: 1,200/500/100/75 PIC IFR, 8/10 hr flight time, 10 hr rest, turbojet OE, the +100-hr-in-type weather bump. Review 5 minutes daily.</p>
  <h4>5. Read the actual reg, then teach it back</h4>
  <p>For each cheat-sheet line, open the verbatim text on the Regulations tab, read the real wording, then close it and explain the rule out loud as if briefing a new SIC. The "teach-back" method exposes the gaps cramming hides.</p>
  <h4>6. Practice scenario chains, not isolated facts</h4>
  <p>Examiners love chains: "You're a 60-hour-in-type PIC, weather at destination is forecast marginal, your alternate is 50 minutes away…" Walk through 135.225 mins (+100/½), 135.223 alternate logic, and the 1-hour rule together (Figure 4). Build 8–10 of these scenarios.</p>
  <div class="callout teal"><strong>Suggested 2-week ramp:</strong> Days 1-3 — layer model + 91→135 diff; skim the GOM TOC. Days 4-7 — Subpart E (who serves) + the .293/.297/.299 trio; start flashcards. Days 8-10 — 135.267 duty/rest + weather/alternate cheat sheet; build the calendar. Days 11-14 — OpSpecs walkthrough + 8-10 scenario chains + teach-back.</div>`;

/* ============================================================
   REGULATIONS — load JSON, render, search
   ============================================================ */
let REGDATA=null;
function renderRegs(filter){
  const body=$('#regBody');body.innerHTML='';
  const q=(filter||'').toLowerCase().trim();
  REGDATA.groups.forEach(g=>{
    const grp=el('div','reg-group');grp.id='reg-'+g.id;
    grp.append(el('div','reg-group-h',g.title));
    let anyShown=false;
    g.sections.forEach(s=>{
      const hay=(s.title+' '+s.paras.map(p=>p.html).join(' ')).toLowerCase();
      const match=!q||hay.includes(q);
      if(match)anyShown=true;
      const sec=el('div','reg-sec'+(q&&!match?' dim':''));
      sec.innerHTML=`<h3>${s.title} <a class="ecfr" href="${s.url}" target="_blank" rel="noopener">[eCFR ↗]</a></h3>`;
      s.paras.forEach(p=>sec.append(el('div','reg-p d'+Math.min(p.depth,3),p.html)));
      grp.append(sec);
    });
    if(!q||anyShown)body.append(grp);
  });
}
function buildToc(){
  const toc=$('#regToc');
  REGDATA.groups.forEach(g=>{
    const b=el('button',null,g.short||g.title.replace(/ —.*/,'').replace('Part 135','135'));
    b.addEventListener('click',()=>{$('#reg-'+g.id).scrollIntoView({behavior:'smooth',block:'start'});});
    toc.append(b);
  });
}
fetch('data/regs.json').then(r=>r.json()).then(d=>{
  REGDATA=d;buildToc();renderRegs('');
  $('#regValid').textContent=`Text: ${d.title14edition}. Valid from ${d.validFrom}.`;
  let t;$('#regSearch').addEventListener('input',e=>{clearTimeout(t);t=setTimeout(()=>renderRegs(e.target.value),120);});
}).catch(()=>{$('#regBody').innerHTML='<p class="fineprint">Could not load regulations data.</p>';});

/* ============================================================
   REG VALIDITY BANNER + REFRESH (reads status.json from repo)
   ============================================================ */
function applyStatus(s,live){
  const dot=$('#regDot'),txt=$('#regText');
  const validFrom=s.regsValidFrom||s.validFrom||'2026-05-01';
  const checked=(s.lastChecked||'').slice(0,10);
  if(s.status==='changed'||(s.changes&&s.changes.length)){
    dot.className='regbar-dot changed';
    txt.innerHTML=`<b>Regulation changes detected.</b> ${s.changes.length} section(s) amended since ${validFrom}. Last checked ${checked}.`;
  }else if(s.status==='warn'){
    dot.className='regbar-dot warn';
    txt.innerHTML=`Regs in use are valid from <b>${validFrom}</b>. ${s.note||''} Last checked ${checked}.`;
  }else{
    dot.className='regbar-dot';
    txt.innerHTML=`Regulations current — text valid from <b>${validFrom}</b> (${s.edition||'Title 14 CFR'}). Last checked ${checked}.`;
  }
  $('#footValid').textContent=`Regs valid from ${validFrom} · last checked ${checked}`;
}
function loadStatus(live){
  const url='data/status.json'+(live?('?t='+Date.now()):'');
  return fetch(url).then(r=>r.json()).then(s=>{applyStatus(s,live);return s;});
}
loadStatus(false).catch(()=>{$('#regText').textContent='Regulation status unavailable.';});
$('#refreshBtn').addEventListener('click',function(){
  const ic=$('#refreshIcon');ic.classList.add('spin');this.disabled=true;
  $('#regText').textContent='Checking eCFR for amendments…';
  loadStatus(true).finally(()=>{
    setTimeout(()=>{ic.classList.remove('spin');this.disabled=false;},500);
  });
});

/* ============================================================
   PRINT helper — isolate a view for printing
   ============================================================ */
function printView(view){
  const v=$('#view-'+view);v.classList.add('printing');
  const after=()=>{v.classList.remove('printing');window.removeEventListener('afterprint',after);};
  window.addEventListener('afterprint',after);
  window.print();
  setTimeout(after,1000);
}

/* deep link on load */
const hash=location.hash.replace('#','');
if(VIEWS.includes(hash))go(hash);else go('learn');
})();
