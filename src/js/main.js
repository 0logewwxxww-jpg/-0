import '../css/style.css';
import { Preferences } from '@capacitor/preferences';

const sections = [
  ['📰','أخبار المدرسة','آخر المستجدات والأنشطة المدرسية'],
  ['📢','الإعلانات','التنبيهات والتعليمات الرسمية'],
  ['👩‍🏫','الكادر التدريسي','التعريف بالهيئة التعليمية'],
  ['🎒','التلاميذ','معلومات التلاميذ بعد تفعيل النظام'],
  ['🗓️','الحضور والغياب','متابعة الدوام المدرسي'],
  ['📚','الجدول الدراسي','الجداول والحصص الأسبوعية'],
  ['✏️','الواجبات','الواجبات والمهام الصفية'],
  ['📝','الامتحانات والنتائج','مواعيد الامتحانات والنتائج'],
  ['📆','التقويم المدرسي','المناسبات والعطل والفعاليات'],
  ['🏅','النشاطات والفعاليات','الأنشطة والمسابقات المدرسية'],
  ['🖼️','معرض الصور','توثيق فعاليات المدرسة'],
  ['📖','مكتبة المدرسة','مصادر ومواد تعليمية'],
  ['☎️','اتصل بنا','قنوات التواصل مع المدرسة']
];
const news = [
  ['مرحباً بكم في التطبيق الإلكتروني لمدرسة الإمامين الكاظمين الابتدائية','رسالة ترحيبية','هذه مساحة المدرسة الرقمية للتواصل ونشر المستجدات.'],
  ['تنويه: هذه نسخة تجريبية','معلومة مهمة','المحتوى توضيحي ولا توجد قاعدة بيانات مدرسية متصلة حالياً.']
];
const root=document.querySelector('#app');
let page='الرئيسية', user=null, query='';
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon=n=>sections.find(x=>x[1]===n)?.[0]||'🔹';
function header(){return `<header><div class="head"><div class="logo">🏫</div><div><h1>مدرسة الإمامين الكاظمين الابتدائية</h1><small>التطبيق الإلكتروني للمدرسة</small></div><button id="menu" class="icon">☰</button></div><div class="date"><span id="today"></span><b id="clock"></b></div></header><div class="ticker">📢 أهلاً وسهلاً بكم — معاً نحو جيل واعٍ ومبدع</div>`;}
function cards(list){return `<div class="grid">${list.map(([i,n,d])=>`<button class="service" data-page="${safe(n)}"><i>${i}</i><b>${safe(n)}</b><small>${safe(d)}</small></button>`).join('')}</div>`;}
function newsCards(){return news.map((n,i)=>`<article class="news"><span>📣</span><div><b>${safe(n[0])}</b><small>${safe(n[1])}</small><p>${safe(n[2])}</p><button class="link" data-news="${i}">قراءة التفاصيل ←</button></div></article>`).join('');}
function home(){return `<section class="hero"><small>أهلاً بكم في مدرستنا</small><h2>مرحباً بك${user?'، '+safe(user.name):''} 👋</h2><p>نتمنى لكم يوماً دراسياً مليئاً بالنجاح والتميز</p><div class="cap">🎓</div></section><h3>الخدمات المدرسية</h3>${cards(sections.slice(0,6))}<div class="heading"><h3>آخر الأخبار</h3><button class="link" data-page="الأخبار">عرض الكل</button></div><section class="panel">${newsCards()}</section><p class="notice">نسخة أولية للعرض: لا توجد بيانات مدرسية فعلية أو مصادقة مستخدمين متصلة حالياً.</p>`;}
function account(){return user?`<h2>حسابي</h2><section class="panel"><b>${safe(user.name)}</b><p>${safe(user.role)}</p><button id="logout" class="primary">تسجيل الخروج</button></section>`:`<h2>حسابي</h2><section class="panel"><label>الاسم المعروض</label><input id="name" class="field" placeholder="اكتب اسماً تجريبياً"><label>نوع الحساب</label><select id="role" class="field"><option>مدير المدرسة</option><option>المعلم</option><option>ولي الأمر</option></select><button id="login" class="primary">دخول تجريبي</button><p class="muted">دخول للعرض فقط ولا يتحقق من الهوية.</p></section>`;}
function content(){if(page==='الرئيسية')return home();if(page==='الأخبار')return `<h2>أخبار المدرسة</h2><section class="panel">${newsCards()}</section>`;if(page==='الخدمات')return `<h2>الخدمات المدرسية</h2><input id="search" class="field" placeholder="ابحث عن خدمة..." value="${safe(query)}">${cards(sections.filter(x=>(x[1]+x[2]).includes(query)))}`;if(page==='حسابي')return account();const s=sections.find(x=>x[1]===page);return `<div class="section-icon">${icon(page)}</div><h2>${safe(page)}</h2><section class="panel empty"><b>هذا القسم بانتظار تفعيل النظام</b><p>${safe(s?.[2]||'ستضاف المعلومات الرسمية بعد اعتمادها من إدارة المدرسة.')}</p><small>لا توجد بيانات منشورة حالياً</small></section>`;}
function render(){root.innerHTML=`${header()}<main>${content()}</main><nav>${[['الرئيسية','⌂'],['الأخبار','▤'],['الخدمات','▦'],['حسابي','♙']].map(([n,i])=>`<button data-page="${n}" class="${page===n?'active':''}"><i>${i}</i>${n}</button>`).join('')}</nav><aside id="drawer"><section><button id="close" class="close">إغلاق ×</button><h3>القائمة الرئيسية</h3>${cards(sections)}</section></aside><div id="toast"></div>`;
root.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.page)));root.querySelector('#menu').onclick=()=>root.querySelector('#drawer').classList.add('open');root.querySelector('#close').onclick=()=>root.querySelector('#drawer').classList.remove('open');root.querySelector('#login')?.addEventListener('click',async()=>{const name=root.querySelector('#name').value.trim();if(name.length<2)return notify('اكتب اسماً من حرفين على الأقل');user={name,role:root.querySelector('#role').value};try{await Preferences.set({key:'demo-user',value:JSON.stringify(user)});}catch{}go('حسابي');});root.querySelector('#logout')?.addEventListener('click',async()=>{user=null;try{await Preferences.remove({key:'demo-user'});}catch{}go('حسابي');});root.querySelector('#search')?.addEventListener('input',e=>{query=e.target.value;render();const x=root.querySelector('#search');x.focus();x.setSelectionRange(query.length,query.length);});root.querySelectorAll('[data-news]').forEach(b=>b.onclick=()=>alert(news[+b.dataset.news].join('\n\n')));root.querySelector('#drawer').onclick=e=>{if(e.target.id==='drawer')e.currentTarget.classList.remove('open');};updateClock();}
function go(n){page=n;query='';render();window.scrollTo({top:0,behavior:'smooth'});}
function notify(s){const t=root.querySelector('#toast');t.textContent=s;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400);}
function updateClock(){const now=new Date();const c=document.querySelector('#clock'),d=document.querySelector('#today');if(c)c.textContent=new Intl.DateTimeFormat('ar-IQ',{timeZone:'Asia/Baghdad',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(now);if(d)d.textContent=new Intl.DateTimeFormat('ar-IQ',{timeZone:'Asia/Baghdad',weekday:'long',year:'numeric',month:'long',day:'numeric'}).format(now);}
setInterval(updateClock,1000);
(async()=>{try{const x=await Preferences.get({key:'demo-user'});if(x.value)user=JSON.parse(x.value);}catch{}render();})();
