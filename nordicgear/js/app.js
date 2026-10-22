const svg=c=>`<svg viewBox="0 0 80 72" aria-hidden="true">${ICON[c]}</svg>`;
const pic=p=>p.img?`<img src="${p.img}" alt="${p.n}" loading="lazy">`:svg(p.c);
const zl=v=>v.toLocaleString("pl-PL")+" zł";
const $=s=>document.querySelector(s);
const st={cat:"Wszystko",q:"",max:9000,sort:"pop"};
let cart={};
try{cart=JSON.parse(localStorage.getItem("ng-cart")||"{}")}catch(e){}
const save=()=>{try{localStorage.setItem("ng-cart",JSON.stringify(cart))}catch(e){}};

function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),1800)}

function renderNav(){$("#nav").innerHTML=CATS.map(c=>`<button data-c="${c}" aria-pressed="${c===st.cat}">${c}</button>`).join("")}
function list(){
 let r=P.filter(p=>(st.cat==="Wszystko"||(st.cat==="Promocje"?p.o>0:p.c===st.cat))&&p.p<=st.max&&(p.n+" "+p.c+" "+p.s.join(" ")).toLowerCase().includes(st.q));
 r.sort((a,b)=>st.sort==="asc"?a.p-b.p:st.sort==="desc"?b.p-a.p:b.pop-a.pop);return r}
function renderGrid(){
 const r=list();
 $("#title").textContent=st.cat==="Wszystko"&&!st.q?"Popularne produkty":st.cat==="Wszystko"?"Wyniki wyszukiwania":st.cat;
 $("#count").textContent=r.length+" "+(r.length===1?"produkt":"produktów");
 $("#grid").innerHTML=r.length?r.map(p=>`<article class="card"><button class="thumb" data-d="${p.id}" aria-label="Szczegóły: ${p.n}">${p.o?`<span class="tag">−${Math.round(100-p.p/p.o*100)}%</span>`:""}${pic(p)}</button><div class="info"><h3>${p.n}</h3><div class="spec">${p.s[0]}, ${p.s[1]}</div><div class="price">${zl(p.p)}${p.o?`<s>${zl(p.o)}</s>`:""}</div><button class="btn" data-a="${p.id}">Dodaj do koszyka</button></div></article>`).join(""):`<div class="empty" style="grid-column:1/-1">Nic nie znaleziono. Zmień frazę lub zwiększ limit ceny.</div>`}
function renderCart(){
 const ids=Object.keys(cart).filter(i=>P.find(p=>p.id==i));
 const n=ids.reduce((a,i)=>a+cart[i],0),sum=ids.reduce((a,i)=>a+cart[i]*P.find(p=>p.id==i).p,0);
 $("#badge").textContent=n;$("#badge").hidden=!n;$("#sum").textContent=zl(sum);
 $("#lines").innerHTML=ids.length?ids.map(i=>{const p=P.find(x=>x.id==i);return `<div class="line"><strong>${p.n}</strong><span>${zl(p.p*cart[i])}</span><div class="qty"><button data-m="${i}" aria-label="Mniej">−</button><span>${cart[i]}</span><button data-pl="${i}" aria-label="Więcej">+</button></div><button class="rm" data-r="${i}">Usuń</button></div>`}).join(""):`<div class="empty">Koszyk jest pusty. Dodaj coś z oferty.</div>`;
 $("#checkout").disabled=!ids.length;save()}
function add(id){cart[id]=(cart[id]||0)+1;renderCart();toast("Dodano do koszyka")}
function drawer(on){$("#drawer").classList.toggle("on",on);$("#scrim").classList.toggle("on",on);$("#drawer").setAttribute("aria-hidden",!on)}
function modal(id){
 const p=P.find(x=>x.id==id);
 $("#sheet").innerHTML=`<div class="thumb">${pic(p)}</div><div class="body"><h2 style="margin:0">${p.n}</h2><div class="price">${zl(p.p)}${p.o?`<s>${zl(p.o)}</s>`:""}</div><ul>${p.s.map(x=>`<li>${x}</li>`).join("")}</ul><button class="btn" data-a="${p.id}">Dodaj do koszyka</button><button class="btn ghost" data-x>Zamknij</button></div>`;
 $("#modal").classList.add("on");$("#scrim").classList.add("on")}
function closeAll(){$("#modal").classList.remove("on");drawer(false)}

document.addEventListener("click",e=>{
 const t=e.target.closest("button,a");if(!t)return;const d=t.dataset;
 if(d.c){st.cat=d.c;renderNav();renderGrid();$("#nav").classList.remove("on");$("#sklep").scrollIntoView()}
 if(d.a)add(+d.a);
 if(d.d)modal(+d.d);
 if("x" in d)closeAll();
 if(d.pl){cart[d.pl]++;renderCart()}
 if(d.m){cart[d.m]--;if(cart[d.m]<1)delete cart[d.m];renderCart()}
 if(d.r){delete cart[d.r];renderCart()}
});
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeAll()});
$("#scrim").onclick=closeAll;
$("#cartBtn").onclick=()=>drawer(true);$("#closeCart").onclick=()=>drawer(false);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAll()});
$("#checkout").onclick=()=>{cart={};renderCart();drawer(false);toast("To demo – zamówienie nie zostało złożone")};
$("#q").oninput=e=>{st.q=e.target.value.trim().toLowerCase();renderGrid()};
$("#sort").onchange=e=>{st.sort=e.target.value;renderGrid()};
$("#max").oninput=e=>{st.max=+e.target.value;$("#maxOut").textContent=zl(st.max);renderGrid()};
$("#burger").onclick=()=>{const o=$("#nav").classList.toggle("on");$("#burger").setAttribute("aria-expanded",o)};
$("#theme").onclick=()=>{const r=document.documentElement,dark=r.dataset.theme?r.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=dark?"light":"dark";try{localStorage.setItem("ng-theme",r.dataset.theme)}catch(e){}};
try{const th=localStorage.getItem("ng-theme");if(th)document.documentElement.dataset.theme=th}catch(e){}

// walidacja formularza
const rules={n:v=>v.trim().length<2?"Podaj imię (min. 2 znaki).":"",e:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)?"":"Podaj poprawny adres e-mail.",m:v=>v.trim().length<10?"Wiadomość musi mieć min. 10 znaków.":""};
function check(id){const el=$("#"+id),msg=rules[id](el.value),box=el.parentElement;box.classList.toggle("bad",!!msg);box.querySelector(".err").textContent=msg;el.setAttribute("aria-invalid",!!msg);return!msg}
Object.keys(rules).forEach(id=>$("#"+id).addEventListener("blur",()=>check(id)));
$("#form").addEventListener("submit",e=>{e.preventDefault();const ok=Object.keys(rules).map(check).every(Boolean);if(ok){$("#form").hidden=true;$("#ok").hidden=false}});

renderNav();renderGrid();renderCart();
