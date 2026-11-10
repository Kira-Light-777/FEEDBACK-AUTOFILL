// ==UserScript==
// @name         KGP Feedback
// @namespace    https://kira-light-777.github.io/FEEDBACK-AUTOFILL/
// @version      1.0.0
// @description  Fills the IIT KGP ERP end-term feedback form course by course, then opens your admit card. You type each captcha.
// @match        https://erp.iitkgp.ac.in/*
// @noframes
// @grant        none
// @run-at       document-idle
// @downloadURL  https://kira-light-777.github.io/FEEDBACK-AUTOFILL/kgp-feedback.user.js
// @updateURL    https://kira-light-777.github.io/FEEDBACK-AUTOFILL/kgp-feedback.user.js
// ==/UserScript==

(function(){
'use strict';
if(/SSOAdministration|login\.htm/i.test(location.pathname))return;   /* no button on the login page */
function kgpFeedback(){

const ID='fbh';const old=document.getElementById(ID);
if(old){old.remove();const ov=document.getElementById('fbhov');if(ov)ov.remove();clearInterval(window.__fbhT);return;}
const ORIGIN='https://erp.iitkgp.ac.in',MENU=ORIGIN+'/IIT_ERP3/menulist.htm?module_id=16';
const ADMIT=['16','715','https://erp.iitkgp.ac.in/Academic/StudentAdmitCardDownload.htm','','Academic','Examination TimeTable','DownLoad Admit Card'];
const FEEDBACK=['16','754','https://erp.iitkgp.ac.in/Academic/studentFeedbackResponseView.htm','','Academic','Feedback','Feedback Form'];
const LS={get(k,dflt){try{const v=JSON.parse(localStorage.getItem('fbh3_'+k));return v==null?dflt:v}catch(e){return dflt}},set(k,v){try{localStorage.setItem('fbh3_'+k,JSON.stringify(v))}catch(e){}}};
const P={
t1:[
'Sometimes the pace was a bit fast, so slower coverage of difficult topics would help.',
'More solved examples in class would make the harder concepts easier to follow.',
'Assignment and test feedback could come a little earlier so we can improve in time.',
'Some topics needed more time and could be connected better to practical applications.',
'Board work and slides were sometimes hard to follow from the back of the room.',
'A few lectures felt rushed near the end, especially when new topics were introduced.',
'It would help if the important points of each lecture were summarised at the end.',
'Some derivations were skipped quickly, which made it harder to revise them later on.',
'The connection between lectures and tutorials could be a little clearer for students.',
'At times it was difficult to keep up with the notes while also listening carefully.',
'More time for questions during class would help students clear doubts on the spot.',
'Some concepts could be explained with more real life examples to make them stick.',
'The course material was sometimes spread across many sources, which was confusing to follow.',
'A clearer plan of upcoming topics at the start of each week would be helpful.',
'Occasionally the explanations assumed background knowledge that not every student had yet.',
'The difficulty of some problems in class was higher than what we had practised.',
'Audio in the large classroom was sometimes unclear, so a microphone would help a lot.',
'Some lectures had too much content, and fewer topics in more depth would work better.',
'It would be nice to have more interaction instead of mostly one way lecturing.',
'The handwriting on the board was occasionally hard to read from the middle rows.',
'Practice material before tests was limited, so more sample questions would be useful.',
'A short recap of the previous class at the start would help in following along.',
'Some lab instructions were brief, so a little more guidance at the beginning would help.',
'Feedback on submitted work was short, and a few more comments would help us improve.',
'The pace varied a lot between lectures, so a steadier pace would be easier to follow.',
'Doubts raised outside class sometimes took a while to get resolved before the deadline.',
'More focus on problem solving techniques would help in exams along with the theory.',
'Some slides had a lot of text, so simpler slides with diagrams would be clearer.',
'A few topics felt disconnected from each other, and linking them would improve understanding.',
'A little more time spent on the basics would help students who found it new.'
],
t2:[
'Explains concepts clearly and connects them well with practical examples in class.',
'Very approachable and always willing to answer questions during and after class.',
'Well organised lectures with a clear structure that made the course easy to follow.',
'Assignments were well designed and really helped in understanding the subject better.',
'Strong subject knowledge and encourages students to think about problems independently.',
'Patient with doubts and takes time to explain things again when students ask.',
'Makes difficult topics feel manageable by breaking them into small and clear steps.',
'Lectures were engaging and the examples used in class were relevant and interesting.',
'Clear about expectations for tests and assignments, which made preparation much easier.',
'Encourages questions and creates a comfortable environment where students can speak freely.',
'Good balance between theory and problem solving that helped in understanding the material.',
'Explains the reasoning behind each step instead of just giving the final result.',
'Punctual and well prepared for every class, which made the lectures run smoothly.',
'Shows real interest in the subject, and that enthusiasm made the classes more interesting.',
'The notes and material shared were helpful for revision before the examinations.',
'Uses diagrams and examples well, which made abstract ideas much easier to picture.',
'Responds to doubts quickly and is easy to reach when students need some help.',
'The way topics were sequenced made it easy to build understanding step by step.',
'Gives useful hints during problem solving without directly giving away the full answer.',
'Fair in evaluation and clear about how marks were given in tests and assignments.',
'Relates the subject to applications in engineering, which made it feel more meaningful.',
'Speaks clearly and explains at a pace that most of the class could follow comfortably.',
'Revises important points regularly, which helped in remembering the key ideas of the course.',
'Treats students with respect and is supportive when someone is struggling with the topics.',
'Lab sessions were well guided and helped in applying what was taught in lectures.',
'Encourages students to attempt problems on their own before showing the full solution.',
'Clear explanations of fundamentals that made the advanced topics easier to understand later.',
'Good at keeping the class attentive and involved throughout the lecture hour.',
'Very knowledgeable and able to answer even unexpected questions with clear explanations.',
'The tutorial problems chosen were well matched to the level of the lectures.'
],
t3:[
'More practice problems and solved examples before exams would help students a lot.',
'Sharing lecture notes or slides after each class would make revision much easier.',
'A few doubt clearing sessions before exams would be very helpful for all students.',
'Releasing assignment solutions soon after the deadline would help us learn from mistakes.',
'The course is going well overall, please continue with the same teaching approach.',
'Short quizzes during the semester would help us check our understanding regularly.',
'A list of recommended books or online resources for each topic would be useful.',
'More examples connecting the topics to real engineering problems would make it interesting.',
'Previous year question papers with solutions would really help in exam preparation.',
'Recording lectures or sharing summaries would help students who miss a class.',
'A slightly slower pace on the hardest topics would help everyone keep up comfortably.',
'Regular feedback on our progress would help us know where we need to improve.',
'Interactive sessions where students solve problems in class would make learning more active.',
'A clear weekly schedule of topics would help us prepare ahead for each lecture.',
'More tutorial time for difficult chapters would help in understanding them more deeply.',
'Discussing common mistakes from tests in class would help us avoid them later.',
'Including a few application based assignments would make the subject feel more practical.',
'Office hours at a fixed time each week would make it easier to ask doubts.',
'Revision lectures before the end semester exam would be very helpful for the class.',
'Using more diagrams and visual explanations would make some topics easier to understand.',
'Keeping the same structure but adding more worked examples would be ideal for us.',
'Small group discussions on tough problems could help students learn from each other.',
'It would help to know the marking scheme for each assignment before we start.',
'Providing extra practice sets for those who want more challenge would be appreciated.',
'Overall the course is useful, and a few more examples would make it even better.',
'Sharing the key formulas and results in one place would make revision quicker.',
'A brief summary at the end of every lecture would help in remembering main points.',
'Some more time for lab work would help us finish experiments without rushing.',
'Continuing with clear explanations and adding more practice would make the course excellent.',
'Giving hints for difficult assignment problems in class would help many students.'
]};
const R=['excellent','very good','good','fair','poor'],W=['very heavy','heavy','average','light','very light'],PC=['too fast','fast','just right','slow','too slow'];

/* ---------- reach into ERP's frames (same site) ---------- */
const docs=()=>{const out=[];const walk=dc=>{out.push(dc);dc.querySelectorAll('iframe,frame').forEach(f=>{try{if(f.contentDocument)walk(f.contentDocument)}catch(e){}})};walk(document);return out};
const FD=()=>docs().find(dc=>dc.querySelector('input[name=subject]'));
const clean=s=>(s||'').replace(/\s+/g,' ').trim();
const ltxt=r=>{const l=r.closest&&r.closest('label');if(!l)return r.value;return clean([...l.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join(' '))||r.value};
const hidden=el=>!el||el.style.display==='none'||(el.ownerDocument.defaultView.getComputedStyle(el).display==='none');
const fire=el=>['input','keyup','change'].forEach(ev=>el.dispatchEvent(new Event(ev,{bubbles:true})));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- open an ERP menu item: same POST that clicking it sends ---------- */
function post(args,target){
  const f=document.createElement('form');f.method='post';f.action=ORIGIN+'/IIT_ERP3/showmenu.htm';f.target=target||'_top';
  ['module_id','menu_id','link','delegated_by','module_name','parent_display_name','display_name'].forEach((n,i)=>{if(n==='delegated_by'&&!args[i])return;const x=document.createElement('input');x.type='hidden';x.name=n;x.value=args[i]||'';f.appendChild(x)});
  document.body.appendChild(f);f.submit();
}
function openAdmitCard(){post(ADMIT,'_top')}

/* ---------- panel ---------- */
const d=document.createElement('div');d.id=ID;
d.style.cssText='position:fixed;top:64px;right:16px;z-index:2147483647;width:320px;max-height:80vh;overflow:auto;background:#fffdf7;border:2px solid #1f4e79;border-radius:10px;padding:12px 14px;font:13px/1.45 Arial,sans-serif;color:#222;box-shadow:0 6px 24px rgba(0,0,0,.25);text-align:left';
document.body.appendChild(d);
const btn='display:block;width:100%;margin-top:10px;padding:8px;background:#1f4e79;color:#fff;border:0;border-radius:6px;font-weight:bold;cursor:pointer';
const btn2='display:block;width:100%;margin-top:6px;padding:7px;background:#fff;color:#1f4e79;border:1.5px solid #1f4e79;border-radius:6px;cursor:pointer';
const show=b=>{d.innerHTML='<div style="font-weight:bold;font-size:14px;color:#1f4e79">KGP Feedback<span id="fbx" title="Close" style="float:right;cursor:pointer;color:#999">&#10005;</span></div><div style="margin-top:8px">'+b+'</div>';d.querySelector('#fbx').onclick=()=>{d.remove();const ov=document.getElementById('fbhov');if(ov)ov.remove();clearInterval(window.__fbhT)}};
const $=id=>d.querySelector('#'+id);
const opt=(a,v)=>a.map((t,i)=>'<option value="'+i+'"'+(+v===i?' selected':'')+'>'+t+'</option>').join('');

/* 1. right site, logged in, form open */
if(!/(^|\.)iitkgp\.ac\.in$/i.test(location.hostname)){
  show('<b>Open your ERP tab first.</b><br>This bookmark works on <a href="'+ORIGIN+'/IIT_ERP3/showmenu.htm" target="_top">erp.iitkgp.ac.in</a>. Go there and click the bookmark again.');return;
}
if(/SSOAdministration|login\.htm/i.test(location.pathname)){show('<b>Log in to ERP first</b>, then click the bookmark again.');return}
if(FD()){setup();return}
show('Checking your ERP login…');
fetch(MENU,{credentials:'include'}).then(r=>r.text().then(t=>({url:r.url,t}))).then(({url,t})=>{
  if(/SSOAdministration|login\.htm/i.test(url)){show('<b>Your ERP login has expired.</b><br>Log in again, then click the bookmark.');return}
  openHere();
}).catch(openHere);
function openHere(){
  show('Logged in &#10003;<br>Opening the Feedback Form…');
  const ov=document.createElement('iframe');ov.id='fbhov';ov.name='fbhov';
  ov.style.cssText='position:fixed;left:0;top:0;width:100vw;height:100vh;border:0;background:#fff;z-index:2147483646';
  document.body.appendChild(ov);post(FEEDBACK,'fbhov');
  let t=0;const iv=setInterval(()=>{t++;if(FD()){clearInterval(iv);setup()}else if(t>60){clearInterval(iv);show('The Feedback Form didn\'t load. Open it from Academic → Feedback → Feedback Form and click the bookmark again.')}},300);
}

/* 2. setup: pick courses */
function setup(){
  const courses=[...FD().querySelectorAll('input[name=subject]')].map(r=>r.value);
  const chosen=LS.get('courses',null);
  show('<b>Your courses</b> <small style="color:#888">(untick any you don\'t take)</small>'+
   courses.map(c=>'<label style="display:block;margin-top:3px"><input type="checkbox" class="fbc" value="'+esc(c)+'"'+' checked'+'> '+esc(c)+'</label>').join('')+
   '<div style="margin-top:10px">Ratings <select id="fbr">'+opt(['Excellent','Very good','Good','Fair','Poor'],LS.get('r',1))+'</select></div>'+
   '<div style="margin-top:6px">Effort / workload <select id="fbw">'+opt(['Very Heavy','Heavy','Average','Light','Very Light'],LS.get('w',2))+'</select></div>'+
   '<div style="margin-top:6px">Pace of teaching <select id="fbp">'+opt(['Too Fast','Fast','Just Right','Slow','Too Slow'],LS.get('p',2))+'</select></div>'+
   '<div style="color:#888;font-size:11px;margin-top:6px">Each comment box gets a short, polite sentence. You can edit it in the form before submitting. Courses you already submitted are skipped.</div>'+
   '<button id="fbgo" style="'+btn+'">Start</button><button id="fbac" style="'+btn2+'">Already done? Open admit card</button>');
  $('fbac').onclick=openAdmitCard;
  $('fbgo').onclick=()=>{const q=[...d.querySelectorAll('.fbc')].filter(x=>x.checked).map(x=>x.value);LS.set('courses',q);LS.set('r',+$('fbr').value);LS.set('w',+$('fbw').value);LS.set('p',+$('fbp').value);run(q)};
}

/* 3. fill one form */
function fill(dc,i){
  const r=LS.get('r',1),w=LS.get('w',2),p=LS.get('p',2);let n=0,miss=0;const unk=[];
  dc.querySelectorAll('#questionContainer .radio_row').forEach(row=>{
    const rs=[...row.querySelectorAll('input[type=radio]')];const labs=rs.map(x=>ltxt(x).toLowerCase());
    const want=labs.includes('just right')?PC[p]:labs.some(l=>l.includes('heavy'))?W[w]:labs.includes('excellent')?R[r]:null;
    let el=want!=null?rs[labs.indexOf(want)]:null;
    if(!el&&rs.length){el=rs[Math.floor((rs.length-1)/2)];const q=row.closest('tr');unk.push(q&&q.cells[0]?clean(q.cells[0].textContent).replace(':',''):'?')}
    if(!el){miss++;return}
    if(!el.checked)el.click();fire(el);n++;
  });
  dc.querySelectorAll('#questionContainer textarea').forEach(t=>{
    if(t.value.trim())return;const h=(t.placeholder||'')+' '+(t.name||'');
    const k=/weak/i.test(h)?'t1':/strength/i.test(h)?'t2':'t3';
    const used=window.__fbhU=window.__fbhU||{};used[k]=used[k]||new Set();let c=P[k].filter(x=>!used[k].has(x));if(!c.length){used[k].clear();c=P[k]}const pick=c[Math.floor(Math.random()*c.length)];used[k].add(pick);t.value=pick;fire(t);n++;
  });
  return {n,miss,unk};
}

/* 4. the run: every course, every teacher; student decides per teacher */
function run(q){
  const fresh=()=>({phase:'subject',stale:null,tl:null,tIdx:0,assignee:null,tname:'',t:0,t2:0,asked:null,res:null});
  const st=Object.assign({i:0},fresh());
  const head=()=>'<div style="color:#555;font-size:12px">Course '+Math.min(st.i+1,q.length)+' of '+q.length+': '+q.map((c,j)=>j<st.i?'<s>'+esc(c)+'</s>':j===st.i?'<b>'+esc(c)+'</b>':esc(c)).join(' · ')+(st.tl?'<br>Teacher '+Math.min(st.tIdx+1,st.tl.length)+' of '+st.tl.length:'')+'</div>';
  const status=h=>show(head()+h);
  const nextCourse=()=>{st.i++;Object.assign(st,fresh())};
  const nextTeacher=()=>{st.tIdx++;Object.assign(st,{phase:'pick',assignee:null,t2:0,asked:null,res:null})};
  const tick=()=>{
    if(st.i>=q.length){clearInterval(window.__fbhT);show('<b style="color:#1e7e34">All courses done.</b><br>Opening your admit card…');setTimeout(openAdmitCard,1200);return}
    const dc=FD();if(!dc){status('Waiting for the feedback form…');return}
    if(dc.getElementById('overlay'))return;                 /* ERP is loading */
    const code=q[st.i];
    const sr=[...dc.querySelectorAll('input[name=subject]')].find(r=>r.value===code);
    if(!sr){nextCourse();return}
    if(st.phase==='subject'){
      st.stale=new Set(dc.querySelectorAll('input[name=teacherSelection]'));
      sr.click();st.phase='teachers';st.t=Date.now();status('Opening <b>'+esc(code)+'</b>…');return;
    }
    if(st.phase==='teachers'){
      if((dc.getElementById('hid_subno')||{}).value!==code)return;
      const ts=[...dc.querySelectorAll('input[name=teacherSelection]')].filter(r=>!st.stale.has(r));
      if(!ts.length){if(Date.now()-st.t>10000&&st.asked!=='none'){st.asked='none';status('No teacher list came up for <b>'+esc(code)+'</b>.<button id="fbsk" style="'+btn2+'">Skip this course</button><button id="fbrt" style="'+btn2+'">Try again</button>');$('fbsk').onclick=nextCourse;$('fbrt').onclick=()=>{st.phase='subject';st.asked=null}}return}
      st.tl=ts.map(r=>({v:r.value,n:ltxt(r)}));st.tIdx=0;st.phase='pick';return;
    }
    if(st.phase==='pick'){
      if(st.tIdx>=st.tl.length){nextCourse();return}
      const t=st.tl[st.tIdx];const tr=[...dc.querySelectorAll('input[name=teacherSelection]')].find(r=>r.value===t.v);
      if(!tr){nextTeacher();return}
      st.assignee=t.v;st.tname=t.n;tr.click();st.phase='questions';st.t2=0;status('Loading the form for <b>'+esc(t.n)+'</b>…');return;
    }
    if(st.phase==='questions'){
      if((dc.getElementById('hid_assignee_id')||{}).value!==st.assignee)return;
      if(!dc.querySelector('#questionContainer .radio_row, #questionContainer textarea'))return;
      if(!st.t2){st.t2=Date.now();return}
      if(Date.now()-st.t2<500)return;                        /* let ERP load any saved answers */
      const msg=dc.getElementById('dynamic_Message');
      if(hidden(dc.getElementById('captcha_block'))||/has been submitted/i.test(msg?msg.textContent:'')){nextTeacher();return}
      st.res=fill(dc,st.i+st.tIdx);
      const cap=dc.getElementById('captchaInput');if(cap){try{cap.scrollIntoView({block:'center'})}catch(e){}cap.focus();
        if(!cap.__fbh){cap.__fbh=1;cap.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();const sb=dc.getElementById('save_btn');if(sb)sb.click()}})}}
      const fw=dc.defaultView;if(fw&&!fw.__fbhC){fw.__fbhC=1;const oc=fw.confirm;fw.confirm=function(m){return /save the details/i.test(String(m))?true:oc.call(fw,m)}}
      st.phase='submit';
      status('<div style="font-size:15px;margin-top:4px"><b>'+esc(code)+'</b> · <b>'+esc(st.tname)+'</b></div><span style="color:#1e7e34">&#10003; '+st.res.n+' answers filled.</span>'+
        (st.res.unk.length?'<br><span style="color:#b9770e">Q'+st.res.unk.join(', Q')+' had an unusual scale, middle option picked. Check it.</span>':'')+
        (st.res.miss?'<br><span style="color:#c0392b">'+st.res.miss+' question(s) need you to pick by hand.</span>':'')+
        '<div style="margin-top:10px;padding:8px;background:#eef6ee;border-radius:6px"><b>Taught you?</b> Type the captcha and press <b>Enter</b>.</div>'+
        '<button id="fbskip" style="'+btn2+'">Skip, didn\'t teach me</button>'+
        '<button id="fbskc" style="'+btn2+';border-color:#bbb;color:#666">Skip rest of '+esc(code)+'</button>');
      $('fbskip').onclick=nextTeacher;$('fbskc').onclick=nextCourse;
      return;
    }
    if(st.phase==='submit'){
      const msg=dc.getElementById('dynamic_Message');
      if(hidden(dc.getElementById('captcha_block'))||(msg&&/alert-success/.test(msg.className))){
        setTimeout(()=>dc.querySelectorAll('.bootstrap-dialog .close, .modal.in .close, .modal .bootstrap-dialog-close-button button').forEach(b=>{try{b.click()}catch(e){}}),600);
        nextTeacher();
      }
    }
  };
  clearInterval(window.__fbhT);window.__fbhT=setInterval(tick,400);tick();
}

}
const b=document.createElement('button');
b.id='fbh-launch';b.type='button';b.textContent='KGP Feedback';
b.style.cssText='position:fixed;right:18px;bottom:18px;z-index:2147483645;padding:11px 16px;background:#1f4e79;color:#fff;border:0;border-radius:8px;font:bold 14px Arial,sans-serif;cursor:pointer;box-shadow:3px 3px 0 #0f2a44';
b.title='Fill your feedback forms';
b.addEventListener('click',kgpFeedback);
document.body.appendChild(b);
})();
