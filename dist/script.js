const sections=[...document.querySelectorAll('[data-section]')];
const dots=[...document.querySelectorAll('.section-dots a')];
const progress=document.querySelector('.progress span');
const nav=document.querySelector('.primary-nav');
const menuButton=document.querySelector('.menu-toggle');

function updateScrollUI(){
  const doc=document.documentElement;
  const max=doc.scrollHeight-doc.clientHeight;
  if(progress) progress.style.width=`${max>0?Math.max(0,Math.min(100,window.scrollY/max*100)):0}%`;
  const marker=window.scrollY+window.innerHeight*.42;
  let active=sections[0]?.id;
  for(const section of sections){if(section.offsetTop<=marker)active=section.id;}
  dots.forEach(dot=>dot.classList.toggle('active',dot.getAttribute('href')===`#${active}`));
  document.querySelectorAll('.primary-nav a[href^="#"]').forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${active}`));
}
window.addEventListener('scroll',updateScrollUI,{passive:true});
window.addEventListener('resize',updateScrollUI);
updateScrollUI();

menuButton?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Đóng menu':'Mở menu');
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded','false');
  menuButton?.setAttribute('aria-label','Mở menu');
}));

const form=document.querySelector('.demo-form');
document.querySelectorAll('[data-intent],[data-project]').forEach(link=>link.addEventListener('click',()=>{
  const intent=link.dataset.intent;
  const project=link.dataset.project;
  if(intent&&form?.elements.intent)form.elements.intent.value=intent;
  if(project&&form?.elements.project)form.elements.project.value=project;
}));
form?.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const notice=form.querySelector('.form-notice');
  const name=form.elements.name.value.trim();
  notice.textContent=`Cảm ơn ${name}. Đây là bước xác nhận của bản demo; thông tin chưa được gửi hoặc lưu. Để liên hệ KNIC, vui lòng dùng email hoặc số điện thoại hiển thị bên cạnh.`;
  notice.classList.add('visible');
  notice.scrollIntoView({behavior:'smooth',block:'nearest'});
});
