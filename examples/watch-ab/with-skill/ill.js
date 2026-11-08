(function(){
const K=.5774,C=350,TAU=Math.PI*2;
const f=n=>Math.round(n*100)/100;
const flat=(cy,inner,dy)=>`<g transform="translate(${C} ${f(cy+(dy||0))}) matrix(.7071 .4082 -.7071 .4082 0 0)">${inner}</g>`;
/* extruded flat artwork: shade copies then top */
const stack=(cy,inner,depth,sh)=>{let o=`<g class="sh" style="--sh:${sh}">`;for(let d=depth;d>0;d-=2)o+=flat(cy,inner,d);return o+'</g>'+flat(cy,inner,0)};
const disc=(cy,R,t,top,side)=>`<path d="M${C-R} ${cy}v${t}A${R} ${f(R*K)} 0 0 0 ${C+R} ${cy+t}v${-t}Z" fill="${side}"/><ellipse cx="${C}" cy="${cy}" rx="${R}" ry="${f(R*K)}" fill="${top}"/>`;
const ring=(cy,R,r,t,top,side,wall)=>`<path d="M${C-R} ${cy}A${R} ${f(R*K)} 0 0 0 ${C+R} ${cy}v${t}A${R} ${f(R*K)} 0 0 1 ${C-R} ${cy+t}Z" fill="${side}"/>`+
 `<path fill-rule="evenodd" fill="${top}" d="M${C-R} ${cy}a${R} ${f(R*K)} 0 1 0 ${2*R} 0a${R} ${f(R*K)} 0 1 0 ${-2*R} 0ZM${C-r} ${cy}a${r} ${f(r*K)} 0 1 0 ${2*r} 0a${r} ${f(r*K)} 0 1 0 ${-2*r} 0Z"/>`+
 `<path d="M${C-r} ${cy}A${r} ${f(r*K)} 0 0 0 ${C+r} ${cy}v${t}A${r} ${f(r*K)} 0 0 1 ${C-r} ${cy+t}Z" fill="${wall}"/>`;
const circ=(x,y,r,a)=>`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" ${a||''}/>`;
const hole=(x,y,r)=>`M${f(x-r)} ${f(y)}a${f(r)} ${f(r)} 0 1 0 ${f(2*r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2*r)} 0Z`;
function gearPath(n,r){const s=TAU/n,ri=r-6,ro=r+5;let d='';
 for(let i=0;i<n;i++){const a=i*s;[[-.24,ri],[-.14,ro],[.14,ro],[.24,ri]].forEach((p,j)=>{const an=a+p[0]*s;d+=(i+j?'L':'M')+f(Math.cos(an)*p[1])+' '+f(Math.sin(an)*p[1])})}
 d+='Z'+hole(0,0,r*.26);for(let k=0;k<5;k++){const an=k*TAU/5;d+=hole(Math.cos(an)*r*.6,Math.sin(an)*r*.6,r*.17)}return d}
const gears=[[-50,25,38,92,60,0],[46,-90,24,57,38,1],[51,110,17,40,27,1]];
function gearLayer(cy){let o='';
 const one=(top)=>gears.map(g=>`<g transform="translate(${g[0]} ${g[1]})"><g class="sv-spin ${g[5]?'sv-rev':''}" style="--d:${g[4]}s"><path fill-rule="evenodd" fill="${top?'var(--color-brass-light)':'var(--color-brass)'}" d="${gearPath(g[2],g[3])}"/>${top&&g[2]===38?circ(0,0,g[3]*.12,'fill="var(--color-ruby)"'):''}</g></g>`).join('');
 o+='<g class="sh" style="--sh:var(--color-brass-shade)">';for(let d=10;d>0;d-=2)o+=flat(cy,one(0),d);o+='</g>';o+=flat(cy,one(1),0);return o}
function plate(cy){
 let o=`<defs><clipPath id="pc"><circle r="250"/></clipPath></defs>`+disc(cy,250,14,'var(--color-brass)','var(--color-brass-shade)');
 let s='<g clip-path="url(#pc)">';for(let x=-260;x<260;x+=16)s+=`<line x1="${x}" y1="-260" x2="${x}" y2="260" stroke="var(--color-brass-light)" stroke-opacity=".45" stroke-width="6"/>`;s+='</g>';
 s+=circ(0,0,236,'fill="none" stroke="var(--color-brass-shade)" stroke-width="1.5"');
 [[-150,-70],[140,-120],[120,140],[-110,150],[10,-190]].forEach((p,i)=>{s+=circ(p[0],p[1],i<3?15:8,'fill="var(--color-brass-shade)"')+circ(p[0],p[1],i<3?9:4,'fill="var(--color-ruby)"')});
 return o+flat(cy,s,0)}
function balance(cy){
 const spiral=(()=>{let d='';for(let i=0;i<=200;i++){const a=i/200*TAU*4.5,r=18+i/200*84;d+=(i?'L':'M')+f(Math.cos(a)*r)+' '+f(Math.sin(a)*r)}return d})();
 const bridge=`<path d="M${f(Math.cos(3.4)*185)} ${f(Math.sin(3.4)*185)}A185 185 0 0 1 ${f(Math.cos(5.6)*185)} ${f(Math.sin(5.6)*185)}" fill="none" stroke="var(--color-brass)" stroke-width="30" stroke-linecap="round"/>`+circ(Math.cos(3.55)*185,Math.sin(3.55)*185,8,'fill="var(--color-ruby)"')+circ(Math.cos(5.45)*185,Math.sin(5.45)*185,8,'fill="var(--color-ruby)"');
 const wheel=(top)=>`<g class="sv-bal">${circ(0,0,128,`fill="none" stroke="${top?'var(--color-brass-light)':'var(--color-brass)'}" stroke-width="14"`)}`+[0,1,2].map(k=>{const a=k*TAU/3+.5;return `<line x1="0" y1="0" x2="${f(Math.cos(a)*128)}" y2="${f(Math.sin(a)*128)}" stroke="${top?'var(--color-brass-light)':'var(--color-brass)'}" stroke-width="7"/>`}).join('')+`<path d="${spiral}" fill="none" stroke="var(--color-steel)" stroke-width="2"/>`+[0,1,2,3,4,5].map(k=>{const a=k*TAU/6+.2;return circ(Math.cos(a)*128,Math.sin(a)*128,6,'fill="var(--color-brass-shade)"')}).join('')+circ(0,0,11,'fill="var(--color-ruby)"')+'</g>';
 let o='<g class="sh" style="--sh:var(--color-brass-shade)">';for(let d=10;d>0;d-=2)o+=flat(cy,wheel(0)+bridge,d);o+='</g>';
 return o+flat(cy,wheel(1)+bridge,0)}
function dial(cy){
 let o=ring(cy,215,150,8,'var(--color-dial)','var(--color-dial-shade)','var(--color-dial-shade)');
 let s='';for(let i=0;i<60;i++){const a=i*TAU/60-Math.PI/2,big=i%5===0,r1=big?160:188,r2=200;if(big)continue;s+=`<line x1="${f(Math.cos(a)*r1)}" y1="${f(Math.sin(a)*r1)}" x2="${f(Math.cos(a)*r2)}" y2="${f(Math.sin(a)*r2)}" stroke="var(--color-ink)" stroke-opacity=".55" stroke-width="2"/>`}
 for(let i=0;i<12;i++){const a=i*TAU/12-Math.PI/2;s+=`<line x1="${f(Math.cos(a)*162)}" y1="${f(Math.sin(a)*162)}" x2="${f(Math.cos(a)*202)}" y2="${f(Math.sin(a)*202)}" stroke="${i===0?'var(--color-ruby)':'var(--color-ink)'}" stroke-width="${i===0?11:7}"/>`}
 const h=(d,a)=>`<g transform="rotate(${a})"><path d="${d}" fill="var(--color-brass-light)" stroke="var(--color-brass-shade)" stroke-width="2" stroke-linejoin="round"/></g>`;
 const hands=`<g class="sh" style="--sh:var(--color-brass-shade)">${h('M-7 24L-10 0L0-100L10 0L7 24Z',305)}${h('M-5 24L-7 0L0-150L7 0L5 24Z',60)}</g>`;
 const top=h('M-7 24L-10 0L0-100L10 0L7 24Z',305)+h('M-5 24L-7 0L0-150L7 0L5 24Z',60)+`<g class="sv-hand" style="--d:30s;--a:130deg"><line x1="0" y1="34" x2="0" y2="-175" stroke="var(--color-ruby)" stroke-width="3"/>${circ(0,34,8,'fill="var(--color-ruby)"')}</g>`+circ(0,0,10,'fill="var(--color-ruby)"')+circ(0,0,4,'fill="var(--color-dial)"');
 return o+flat(cy,s,0)+flat(cy,hands.replace(/<g class="sh"[^>]*>/,'<g>'),0)&&o+flat(cy,s,0)+`<g transform="translate(0 -14)"><g class="sh" style="--sh:var(--color-brass-shade)">${flat(cy,h('M-7 24L-10 0L0-100L10 0L7 24Z',305)+h('M-5 24L-7 0L0-150L7 0L5 24Z',60),10)}</g>${flat(cy,top,0)}</g>`}
function kase(cy){
 const crown=`<rect x="255" y="-15" width="44" height="30" rx="5" fill="var(--color-steel)" stroke="var(--color-steel-shade)" stroke-width="2"/>`+[0,1,2,3].map(k=>`<line x1="${268+k*8}" y1="-15" x2="${268+k*8}" y2="15" stroke="var(--color-steel-shade)" stroke-width="2"/>`).join('');
 let o=stack(cy,crown,12,'var(--color-steel-shade)')+ring(cy,260,224,20,'var(--color-steel)','var(--color-steel-shade)','var(--color-steel-shade)');
 o+=`<ellipse cx="${C}" cy="${cy}" rx="243" ry="${f(243*K)}" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>`;
 o+=`<defs><linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#fff" stop-opacity=".04"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><ellipse cx="${C}" cy="${cy+8}" rx="224" ry="${f(224*K)}" fill="url(#gl)" stroke="#fff" stroke-opacity=".3"/><path d="M${C-150} ${cy-10}Q${C-60} ${cy-95} ${C+20} ${cy-100}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="5" stroke-linecap="round"/>`;
 return o}
const L=[['Case &amp; sapphire crystal',165,260,20,kase],['Dial &amp; hands',305,215,8,dial],['Balance wheel &amp; hairspring',440,165,10,balance],['Gear train, 21,600 vph',560,200,10,gearLayer],['Mainplate, Geneva-striped',665,250,14,plate]];
let svg=`<defs><radialGradient id="gs"><stop offset="0" stop-color="var(--color-shadow)" stop-opacity=".3"/><stop offset="1" stop-color="var(--color-shadow)" stop-opacity="0"/></radialGradient></defs><ellipse cx="${C}" cy="790" rx="300" ry="34" fill="url(#gs)"/><line x1="${C}" y1="20" x2="${C}" y2="810" stroke="var(--color-ink)" stroke-opacity=".35" stroke-dasharray="3 7"/>`;
for(let i=L.length-1;i>=0;i--){const l=L[i];svg+=`<g class="sv-float" style="animation-delay:${-i*1.3}s">${l[4](l[1])}</g>`}
const el=document.getElementById('ill');el.innerHTML=svg;
const st=el.parentNode,lg=document.getElementById('legend');
L.forEach((l,i)=>{const b=document.createElement('span');b.className='bd';b.textContent=i+1;b.style.left=(C+l[2])/700*100+'%';b.style.top=(l[1]+l[3]/2)/840*100+'%';b.setAttribute('aria-hidden','true');st.appendChild(b);
 if(lg){const li=document.createElement('li');li.innerHTML=`<i>${i+1}</i>${l[0]}`;lg.appendChild(li)}});
})();
