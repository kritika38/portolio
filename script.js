const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const projects={
 skillforge:{num:"01",title:"SkillForge",summary:"An ML-powered career readiness platform that evaluates a candidate's skills against target job roles.",what:"A multi-page Streamlit application with Dashboard, Skill Analysis, Learning Path, Progress and Job Openings sections. It extracts skills from text, scores resume-to-job fit and recommends learning paths.",focus:"spaCy-based NLP skill extraction; TF-IDF and cosine-similarity matching with scikit-learn; modular backend components for extraction, similarity and job matching; SQLite persistence and unit tests.",tags:["Python","scikit-learn","spaCy","Streamlit","SQLite","TF-IDF","NLP"]},
 newspaper:{num:"02",title:"Newspaper Agency Management System",summary:"A Java desktop application that digitizes day-to-day newspaper agency operations.",what:"Customer management, hawker assignments, newspaper inventory, billing and payment tracking in an interactive JavaFX interface.",focus:"Normalized MySQL schema integrated through JDBC, CRUD workflows, search and filtering, dashboards, and automated monthly bill generation to replace manual ledger computation.",tags:["Java","JavaFX","Scene Builder","MySQL","JDBC"]},
 resolvify:{num:"03",title:"Resolvify — Service Management Marketplace",summary:"A service marketplace concept connecting utility providers and users through role-based workflows.",what:"A full-stack service management marketplace with separate provider and user logic, designed around a relational data model.",focus:"Normalized relational schema, multi-role backend logic and JavaMail API notifications to reduce manual communication and improve response turnaround.",tags:["Java","Apache NetBeans","MySQL","JavaMail API"]},
 gesture:{num:"04",title:"Hand Gesture Volume Control",summary:"A real-time, touch-free computer-vision interaction for controlling system volume.",what:"A Python application that detects hand gestures through a webcam and maps hand movement to volume control.",focus:"MediaPipe hand-landmark detection combined with OpenCV processing to interpret gestures in real time.",tags:["Python","OpenCV","MediaPipe","Computer Vision"]}
};
const dialog=$("#caseDialog");
$$(".project-details").forEach(btn=>btn.addEventListener("click",()=>{
 const p=projects[btn.dataset.project]; if(!p)return;
 $("#dialogNum").textContent=p.num;$("#dialogTitle").textContent=p.title;$("#dialogSummary").textContent=p.summary;
 $("#dialogWhat").textContent=p.what;$("#dialogFocus").textContent=p.focus;
 $("#dialogTags").innerHTML=p.tags.map(t=>`<span>${t}</span>`).join("");dialog.showModal();
}));
$("#dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
$$(".filter").forEach(btn=>btn.addEventListener("click",()=>{
 $$(".filter").forEach(b=>b.classList.toggle("active",b===btn));
 const f=btn.dataset.filter;
 $$(".project-card").forEach(card=>card.classList.toggle("hidden",f!=="all"&&card.dataset.category!==f));
}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));
const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=Number(el.dataset.count),decimal=el.dataset.decimal==="true";let start=0;const duration=1100,t0=performance.now();function tick(now){const p=Math.min((now-t0)/duration,1),ease=1-Math.pow(1-p,3);const v=target*ease;el.textContent=decimal?v.toFixed(1):Math.round(v).toLocaleString("en-IN");if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);countObserver.unobserve(el)}),{threshold:.6});
$$("[data-count]").forEach(el=>countObserver.observe(el));
function updateClock(){const d=new Date();$("#localTime").textContent=new Intl.DateTimeFormat("en-IN",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).format(d)+" IST"}
updateClock();setInterval(updateClock,1000);$("#year").textContent=new Date().getFullYear();
$("#themeToggle").addEventListener("click",()=>{document.body.classList.toggle("light");$("#themeToggle").textContent=document.body.classList.contains("light")?"☀":"◐"});
$("#menuBtn").addEventListener("click",()=>$("#nav").classList.toggle("open"));
$$(".nav a").forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));
window.addEventListener("scroll",()=>{const max=document.documentElement.scrollHeight-innerHeight;$("#scrollProgress").style.width=(max>0?scrollY/max*100:0)+"%"},{passive:true});
const cmd=$("#commandDialog"),input=$("#commandInput");
function openCommand(){cmd.showModal();input.value="";setTimeout(()=>input.focus(),50)}
$("#commandHint").addEventListener("click",openCommand);
document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openCommand()}if(e.key==="Escape"&&cmd.open)cmd.close()});
$$("[data-go]").forEach(b=>b.addEventListener("click",()=>{cmd.close();$(b.dataset.go)?.scrollIntoView({behavior:"smooth"})}));
input.addEventListener("input",()=>{$$(".command-list button").forEach(b=>b.hidden=!b.textContent.toLowerCase().includes(input.value.toLowerCase()))});
$$(".command-list a").forEach(a=>a.addEventListener("click",()=>cmd.close()));

// Public coding-profile signals. Live APIs are best-effort; resume values remain labelled fallbacks.
(async function loadCodingProfiles(){
 const cfg=window.PORTFOLIO_CONFIG||{};
 const lcUser=cfg.leetcodeUsername||"kritika_3";
 const gfgUser=cfg.geeksForGeeksUsername||"kritika_03";
 const lcValue=document.getElementById("leetcodeSolved"),lcDetail=document.getElementById("leetcodeDetail");
 const gfgValue=document.getElementById("gfgSolved"),gfgDetail=document.getElementById("gfgDetail");
 // LeetCode uses an undocumented public GraphQL query. Try the origin first, then a GET-only CORS relay.
 try{
  const query='query profile($username: String!) { matchedUser(username: $username) { profile { ranking } submitStats { acSubmissionNum { difficulty count } } } }';
  const params=new URLSearchParams({query,variables:JSON.stringify({username:lcUser})});
  let response;
  try{response=await fetch('https://leetcode.com/graphql?'+params.toString(),{headers:{'Content-Type':'application/json'}});if(!response.ok)throw new Error('direct request blocked');}
  catch(_){response=await fetch('https://proxy.cors.dev/https://leetcode.com/graphql?'+params.toString());}
  if(!response.ok)throw new Error('LeetCode API unavailable');
  const payload=await response.json();
  const rows=payload?.data?.matchedUser?.submitStats?.acSubmissionNum;
  if(!Array.isArray(rows))throw new Error('No public LeetCode stats returned');
  const all=rows.find(x=>x.difficulty==='All');
  const easy=rows.find(x=>x.difficulty==='Easy')?.count||0;
  const medium=rows.find(x=>x.difficulty==='Medium')?.count||0;
  const hard=rows.find(x=>x.difficulty==='Hard')?.count||0;
  const total=Number(all?.count??(easy+medium+hard));
  if(!Number.isFinite(total))throw new Error('Invalid LeetCode count');
  lcValue.textContent=total.toLocaleString('en-IN');
  const rank=payload.data.matchedUser.profile?.ranking;
  lcDetail.textContent=`LIVE · ${easy} Easy / ${medium} Medium / ${hard} Hard${rank?` · Rank ${Number(rank).toLocaleString('en-IN')}`:''}`;
 }catch(err){lcDetail.textContent='Resume snapshot · live stats temporarily unavailable';setStatus(lcStatus,'PROFILE LINKED · SNAPSHOT',false);}
 // Community-maintained GFG stats endpoint; the profile link remains the authoritative destination.
 try{
  let payload;
  try{
   const response=await fetch(`https://gfg-stats.tashif.codes/${encodeURIComponent(gfgUser)}`,{headers:{'Accept':'application/json'}});
   if(!response.ok)throw new Error('Primary GFG stats service unavailable');
   payload=await response.json();
  }catch(_){
   const fallback=await fetch(`https://geeks-for-geeks-stats-api.vercel.app/?raw=y&userName=${encodeURIComponent(gfgUser)}`);
   if(!fallback.ok)throw new Error('GFG stats services unavailable');
   payload=await fallback.json();
  }
  const data=payload?.data||payload;
  const total=Number(data.totalSolved??data.totalProblemsSolved??data.total_problems_solved);
  if(!Number.isFinite(total)||total<0)throw new Error('No GFG solved count returned');
  gfgValue.textContent=total.toLocaleString('en-IN');
  const parts=[['School',data.School??data.school],['Basic',data.Basic??data.basic],['Easy',data.Easy??data.easy],['Medium',data.Medium??data.medium],['Hard',data.Hard??data.hard]].filter(x=>x[1]!==undefined&&x[1]!==null).map(x=>`${x[0]} ${x[1]}`);
  gfgDetail.textContent='LIVE · '+(parts.length?parts.join(' / '):'Public profile statistics');
 }catch(err){gfgDetail.textContent='Resume snapshot · live stats temporarily unavailable';setStatus(gfgStatus,'PROFILE LINKED · SNAPSHOT',false);}
})();

// Public GitHub data: uses GitHub's unauthenticated public REST API.
(async function loadGitHubSignals(){
 const status=document.getElementById("githubStatus");
 const reposEl=document.getElementById("githubRepos");
 const eventsEl=document.getElementById("githubEvents");
 const followersEl=document.getElementById("githubFollowers");
 const list=document.getElementById("repoList");
 const updated=document.getElementById("githubUpdated");
 if(!status||!list)return;
 const username=(window.PORTFOLIO_CONFIG&&window.PORTFOLIO_CONFIG.githubUsername)||"kritika38";
 try{
   const [userRes,repoRes,eventRes]=await Promise.all([
     fetch(`https://api.github.com/users/${encodeURIComponent(username)}`),
     fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6&type=owner`),
     fetch(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=30`)
   ]);
   if(!userRes.ok||!repoRes.ok||!eventRes.ok)throw new Error("GitHub API response unavailable");
   const [user,repos,events]=await Promise.all([userRes.json(),repoRes.json(),eventRes.json()]);
   reposEl.textContent=Number(user.public_repos||0).toLocaleString("en-IN");
   followersEl.textContent=`${Number(user.followers||0)} followers · ${Number(user.following||0)} following`;
   eventsEl.textContent=Number(events.length||0).toLocaleString("en-IN");
   status.classList.remove("error");status.innerHTML="<i></i> LIVE · GITHUB PUBLIC API";
   updated.textContent="Updated from public GitHub data";
   const safeRepos=Array.isArray(repos)?repos.filter(r=>!r.fork).slice(0,6):[];
   list.innerHTML=safeRepos.length?safeRepos.map(r=>`<a class="repo-item" href="${r.html_url}" target="_blank" rel="noreferrer"><strong>${escapeHTML(r.name)}</strong><p>${escapeHTML(r.description||"Public repository · Explore the code")}</p><div class="repo-meta"><span>${escapeHTML(r.language||"Code")}</span><span>★ ${Number(r.stargazers_count||0)}</span></div></a>`).join(""):'<div class="repo-placeholder">No public repositories found yet. Visit the GitHub profile to explore.</div>';
 }catch(err){
   status.classList.add("error");status.innerHTML="<i></i> GITHUB DATA UNAVAILABLE";
   reposEl.textContent="—";eventsEl.textContent="—";
   followersEl.textContent="Check GitHub profile directly";
   list.innerHTML='<div class="repo-placeholder">GitHub API could not be reached right now. The rest of the portfolio is still available — open the GitHub profile to browse repositories.</div>';
   updated.textContent="Live data unavailable; try again later";
 }
})();
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

// Contact form submits to the Vercel serverless endpoint. Configure email secrets in Vercel.
const contactForm=document.getElementById("contactForm");
if(contactForm){
 contactForm.addEventListener("submit",async e=>{
  e.preventDefault();
  const status=document.getElementById("formStatus"),button=contactForm.querySelector('button[type="submit"]');
  const data=Object.fromEntries(new FormData(contactForm).entries());
  if(data.company_website)return;
  button.disabled=true;status.textContent="Sending securely…";
  try{
   const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
   const result=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(result.error||"Message could not be sent.");
   status.textContent="Message sent. Thank you — I'll be in touch!";
   contactForm.reset();
  }catch(error){
   status.textContent=error.message.includes("not configured")?"Contact email is not configured yet. Please use the direct email link below.":"Could not send right now. Email me at kritika.bti@gmail.com.";
  }finally{button.disabled=false}
 });
}
