
const es = document.documentElement.lang === 'es';
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
function closeMenu(){navMenu?.classList.remove('active');hamburger?.classList.remove('active');hamburger?.setAttribute('aria-expanded','false');}
hamburger?.addEventListener('click',()=>{const open=navMenu.classList.toggle('active');hamburger.classList.toggle('active',open);hamburger.setAttribute('aria-expanded',String(open));});
navMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navMenu?.classList.contains('active')){closeMenu();hamburger.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
document.querySelectorAll('[data-year]').forEach(n=>n.textContent=new Date().getFullYear());
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
document.querySelectorAll('[data-category]').forEach(group=>group.hidden=button.dataset.filter!=='all'&&group.dataset.category!==button.dataset.filter);
document.getElementById('filter-status').textContent='Mostrando: '+button.textContent;
}));
document.querySelectorAll('.gallery-item, .gallery-grid > img, .image-pair > img, .feature-image > img').forEach(trigger=>{
const img=trigger.tagName==='IMG'?trigger:trigger.querySelector('img');
if(trigger.tagName==='IMG'){trigger.tabIndex=0;trigger.setAttribute('role','button');trigger.setAttribute('aria-label',(es?'Ampliar: ':'Expand: ')+img.alt);}
function openImage(){const dialog=document.createElement('dialog');dialog.className='image-dialog';dialog.setAttribute('aria-label',img.alt);const big=document.createElement('img');big.src=img.src;big.alt=img.alt;const close=document.createElement('button');close.type='button';close.textContent=es?'Cerrar ×':'Close ×';dialog.append(close,big);document.body.append(dialog);document.body.classList.add('no-scroll');dialog.addEventListener('close',()=>{document.body.classList.remove('no-scroll');dialog.remove();trigger.focus();});close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.showModal();close.focus();}
trigger.addEventListener('click',openImage);if(trigger.tagName==='IMG')trigger.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openImage();}});
});
// Formspree supports JSON submissions. Redirect only after confirmed acceptance.
document.querySelectorAll('form').forEach(form=>{
let status=form.querySelector('.form-status');if(!status){status=document.createElement('p');status.className='form-status';status.setAttribute('role','status');form.append(status);}
form.addEventListener('submit',async e=>{
if(location.hostname==='localhost'||location.hostname==='127.0.0.1'){e.preventDefault();status.textContent=es?'Vista previa: no se ha enviado la consulta.':'Preview: no inquiry was sent.';return;}
if(!form.action.startsWith('https://formspree.io/'))return;
e.preventDefault();const btn=form.querySelector('[type="submit"]');const label=btn.textContent;btn.disabled=true;btn.textContent=es?'Enviando…':'Sending…';status.textContent='';status.classList.remove('is-error');
try{const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});if(!response.ok)throw new Error('submit failed');location.assign(new URL('success.html',location.href).href);}catch(error){status.textContent=es?'No se ha podido confirmar el envío. Inténtalo de nuevo o escribe a info.zuazuart@gmail.com.':'Sending could not be confirmed. Please retry or email info.zuazuart@gmail.com.';status.classList.add('is-error');}finally{btn.disabled=false;btn.textContent=label;}
});});
