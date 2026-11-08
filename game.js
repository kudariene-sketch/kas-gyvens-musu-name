'use strict';
// Visos būsenos laikomos tik šio puslapio atmintyje.
const stages=[
 {name:'Ežys',animal:0,value:'Gerbiame kito ribas.',tasks:[
 ['Kas dengia ežio nugarą?',[['Spygliai','spines'],['Plunksnos','feather'],['Žvynai','scales']],'Pažiūrėk į ežio nugarą. Kas joje kyšo?','Ežio nugarą dengia spygliai.'],
 ['Kodėl ežys susisuka į kamuoliuką?',[['Kad apsisaugotų','protect'],['Kad pažaistų','ball']],'Pagalvok, kas saugo ežį nuo pavojaus.','Susisukęs ežys apsisaugo spygliais.'],
 ['Ežys išsigando. Ką darysi?',[['Leisiu nusiraminti','space'],['Bandysiu ištraukti','pull']],'Išsigandusiam reikia saugios erdvės.','Paliekame ežį ramybėje. Laukinių gyvūnų neliečiame.']]},
 {name:'Voverė',animal:1,value:'Visi turime skirtingų gebėjimų.',tasks:[
 ['Kur voverė gerai laipioja?',[['Medžiuose','tree'],['Vandenyje','water']],'Pagalvok, už ko voverė gali kabintis nagais.','Voverė gerai laipioja medžiais.'],
 ['Kas padeda voverei laikytis ant medžio?',[['Nagai','claws'],['Sparnai','wings']],'Pažiūrėk į voverės letenėles.','Aštrūs nagai padeda kabintis į žievę.'],
 ['Draugas nemoka laipioti. Ką sakysi?',[['Žaiskime kitą žaidimą','play'],['Tu nieko nemoki!','reject']],'Koks žaidimas tiktų abiem draugams?','Galime rasti veiklą, kuri tinka abiem.']]},
 {name:'Kiškis',animal:2,value:'Atsižvelgiame į kito poreikius.',tasks:[
 ['Kokios kiškio ausys?',[['Ilgos','longears'],['Trumpos','shortears']],'Pažiūrėk, kiek ausys kyšo virš galvos.','Kiškio ausys ilgos.'],
 ['Ką kiškis daro ausimis?',[['Klauso','listen'],['Kasa žemę','dig']],'Ką mes darome ausimis?','Ilgos ausys padeda kiškiui girdėti aplinkos garsus.'],
 ['Kiškis išsigando stipraus garso. Ką darysi?',[['Nekelsiu triukšmo','quiet'],['Dar garsiau šauksiu','loud']],'Kas padėtų išsigandusiam nusiraminti?','Elgiamės tyliau, kai kitam per garsiai.']]},
 {name:'Naminė pelėda',animal:3,value:'Gerbiame skirtingus įpročius.',tasks:[
 ['Kuo padengtas pelėdos kūnas?',[['Plunksnomis','feather'],['Kailiu','fur']],'Pelėda yra paukštis. Pažiūrėk į jos sparnus.','Pelėdos kūną dengia plunksnos.'],
 ['Kada naminė pelėda dažniausiai aktyvi?',[['Naktį','night'],['Dieną','day']],'Ji gerai mato prieblandoje.','Naminė pelėda dažniausiai aktyvi naktį.'],
 ['Pelėda dieną ilsisi. Ką darysi?',[['Netrukdysiu ilsėtis','rest'],['Triukšmausiu prie lango','loud']],'Pagalvok, ko reikia norint pailsėti.','Gerbiame kito poilsio laiką.']]},
 {name:'Lapė',animal:4,value:'Nesprendžiame apie kitą iš anksto.',tasks:[
 ['Kokia lapės uodega?',[['Ilga ir pūkuota','tail'],['Trumpa ir plika','baretail']],'Pažiūrėk į lapės uodegos ilgį ir kailį.','Lapės uodega ilga ir pūkuota.'],
 ['Kuo lapei naudinga uodega?',[['Padeda išlaikyti pusiausvyrą','balance'],['Padeda skraidyti','fly']],'Pagalvok, kaip lapė išsilaiko judėdama.','Uodega padeda išlaikyti pusiausvyrą ir šildo šaltu oru.'],
 ['Kaimynai nepažįsta lapės, bet vadina nedraugiška. Ką darysi?',[['Pirmiausia susipažinsiu','meet'],['Patikėsiu gandais','gossip']],'Ar galime pažinti kitą vien iš gandų?','Pasakoje pirmiausia susipažįstame. Gamtoje lapę stebime iš tolo.']]},
 {name:'Mes skirtingi',animal:5,value:'Skirtumai netrukdo būti kartu.',tasks:[
 ['Kuris gyvūnas turi spyglius?',[['Ežys','a0'],['Voverė','a1'],['Pelėda','a3']],'Prisimink, kuris gyvūnas susisuka į dygų kamuoliuką.','Spyglius turi ežys.'],
 {pair:true},
 ['Ar visi turi būti vienodi, kad gyventų pasakos name?',[['Ne. Galime būti skirtingi','different'],['Taip. Tik vienodi','same']],'Prisimink, kiek skirtingų kaimynų jau susipažino.','Pasakos name vietos yra skirtingiems kaimynams.']]},
 {name:'Mūsų bendras namas',animal:5,value:'Mūsų name vietos užtenka visiems!',tasks:[
 ['Kaimynas nori ilsėtis. Ką darysi?',[['Elgsiuosi tyliau','quiet'],['Triukšmausiu','loud']],'Koks elgesys padėtų kaimynui pailsėti?','Atsižvelgiame į kito poreikį pailsėti.'],
 ['Kaimynui reikia pagalbos. Ką darysi?',[['Pasiūlysiu padėti','help'],['Nusisuksiu','turn']],'Kaip parodyti, kad pastebime kitą?','Pasiūlome padėti ir paklausiame, kokios pagalbos reikia.'],
 ['Mūsų name vietos užtenka…',[['Visiems','different'],['Tik vienodiems','same']],'Mūsų kaimynai skirtingi. Kiekvienas svarbus.','Mes skirtingi. Mes gerbiame vieni kitus. Mūsų name vietos užtenka visiems!']]}
];
const app=document.querySelector('#app');
let completed=0,step=0,pairStep=0,solved=false,mode='home',orderCache=new Map();
const pairs=[['Voverė','a1','Laipioja','tree'],['Pelėda','a3','Skraido','wings'],['Kiškis','a2','Šokinėja','jump']];
function animal(n,description=''){return `<div class="animal a${n}" role="img" aria-label="${description||['Ežys su spygliais','Voverė ant šakos','Kiškis ilgomis ausimis','Naminė pelėda','Lapė pūkuota uodega','Penki skirtingi miško gyvūnai'][n]}"></div>`;}
// Visi atsakymų vaizdai – natūralios akvarelės iliustracijos.
const sceneKeys=['protect','ball','space','pull','tree','water','play','reject','listen','dig','quiet','loud','night','day','rest','baretail','balance','fly','meet','gossip','same','help','turn','jump'];
function visual(key){
 const details={spines:0,feather:1,scales:2,claws:3,wings:4,tail:5,longears:6,shortears:7,fur:8};
 if(Object.hasOwn(details,key))return '<img class="detail" src="assets/detale-'+details[key]+'.png" alt="">';
 if(/^a\d$/.test(key))return animal(+key[1]);
 if(key==='different')return animal(5);
 if(!sceneKeys.includes(key))throw new Error('Trūksta iliustracijos: '+key);
 return '<img class="detail scene" src="assets/scena-'+key+'.png" alt="">';
}
function focusHeading(){app.querySelector('h1,h2')?.focus();window.scrollTo(0,0);}
function home(){mode='home';app.innerHTML=`<section class="home"><div class="eyebrow">PAŽINKIME IR GERBKIME SKIRTUMUS</div><h1 tabindex="-1">Kas gyvens mūsų name?</h1><p class="intro">${completed===7?'Mes skirtingi. Mes gerbiame vieni kitus.<br><strong>Mūsų name vietos užtenka visiems!</strong>':completed===0?'Tai mūsų pasakos namas. Čia gyvens skirtingi kaimynai.<br>Paspausk pažymėtą langą. Susipažinkime!':`Atsivėrė ${completed} iš 7 langų. Kitas kaimynas jau laukia!<br>Paspausk pažymėtą langą.`}</p><div class="house"><div class="windows">${stages.map((s,i)=>`<button class="window ${i<completed?'done':i===completed?'active':''}" data-window="${i}" ${i!==completed?'disabled':''} aria-label="${i+1} langas. ${s.name}. ${i<completed?'Atvertas':i===completed?'Atverti':'Dar uždarytas'}">${i<completed?animal(s.animal):`<span>${i+1}</span>`}<small>${i<completed?s.name:i===completed?'Atverti →':'Uždaryta'}</small></button>`).join('')}</div><div class="door" aria-hidden="true"></div></div>${completed===7?'<p class="pill">Visi 7 langai atverti · 21 užduotis atlikta</p><p><button id="restart">Pradėti iš naujo</button></p>':'<p class="progress">7 langai · Žaisk savo tempu</p>'}</section>`;app.querySelector('.active')?.addEventListener('click',task);app.querySelector('#restart')?.addEventListener('click',restart);focusHeading();}
function current(){const raw=stages[completed].tasks[step];if(!raw.pair)return raw;const p=pairs[pairStep];return [`Sujunk: ${p[0].toLowerCase()}…`,[[p[2],p[3]],...pairs.filter((_,i)=>i!==pairStep).map(x=>[x[2],x[3]])],'Prisimink, kaip juda šis gyvūnas.',`${p[0]} ${p[2].toLowerCase()}.`];}
// Kaitaliojamos pozicijos subalansuotos kiekvienos žaidimo eigos metu.
function choicesFor(q){const key=`${completed}-${step}-${pairStep}`;if(!orderCache.has(key)){const list=q[1].map((x,i)=>({text:x[0],icon:x[1],correct:i===0}));const position=(completed*3+step+pairStep)%list.length;list.splice(position,0,list.shift());orderCache.set(key,list);}return orderCache.get(key);}
function task(){mode='task';solved=false;const s=stages[completed],q=current(),isPair=!!s.tasks[step].pair;app.innerHTML=`<div class="toolbar"><button id="back">← Į namą</button><span class="progress">Langas ${completed+1} iš 7 · Užduotis ${step+1} iš 3</span></div><section class="task"><div class="question-head">${isPair?visual(pairs[pairStep][1]):animal(s.animal)}<div><div class="eyebrow">${s.name.toUpperCase()}</div>${isPair?`<p class="pair-status">Surask 3 poras · ${pairStep+1} iš 3</p>`:''}<h2 tabindex="-1">${q[0]}</h2></div></div><div class="choices ${q[1].length===3?'three':''}">${choicesFor(q).map((c,i)=>`<button class="choice" data-choice="${i}">${visual(c.icon)}<span>${c.text}</span></button>`).join('')}</div><div id="feedback" class="feedback" role="status" aria-live="polite">Pasirink paveikslėlį.</div><div class="actions"><button id="hint">Užuomina</button><button id="next" class="primary" hidden>Kitas →</button></div></section>`;app.querySelector('#back').onclick=home;app.querySelector('#hint').onclick=()=>{app.querySelector('#feedback').textContent=q[2];};app.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>answer(+b.dataset.choice,b,q));app.querySelector('#next').onclick=next;focusHeading();}
function answer(i,b,q){if(solved)return;const c=choicesFor(q)[i],f=app.querySelector('#feedback');if(!c.correct){b.classList.add('wrong');b.setAttribute('aria-label',c.text+'. Pabandyk dar kartą.');f.textContent='Pabandyk dar kartą. '+q[2];return;}solved=true;b.classList.add('correct');b.querySelector('span').textContent='✓ '+c.text;app.querySelectorAll('[data-choice]').forEach(x=>x.disabled=true);f.classList.add('good');f.textContent='Taip! '+q[3];app.querySelector('#hint').hidden=true;app.querySelector('#next').hidden=false;app.querySelector('#next').focus();}
function next(){if(mode!=='task'||!solved)return;solved=false;if(stages[completed].tasks[step].pair&&pairStep<2){pairStep++;task();return;}pairStep=0;if(step<2){step++;task();return;}const s=stages[completed];completed++;step=0;mode='summary';app.innerHTML=`<section class="task summary"><span class="eyebrow">${completed} LANGAS ATVIRAS</span>${animal(s.animal)}<h1 tabindex="-1">${s.name}</h1><p>${s.value}</p><button id="returnHome" class="primary">${completed===7?'Pamatyti mūsų namą':'Į namą →'}</button></section>`;app.querySelector('#returnHome').onclick=home;focusHeading();}
function restart(){completed=0;step=0;pairStep=0;solved=false;orderCache.clear();home();}
document.querySelector('#help').onclick=()=>document.querySelector('#guide').showModal();document.querySelector('#closeGuide').onclick=()=>document.querySelector('#guide').close();home();
