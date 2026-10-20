IC.calc='<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>';
IC.note='<path d="M5 3h10l4 4v14H5zM14 3v5h5M8 13h8M8 17h5"/>';
IC.clock='<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>';
IC.lang='<path d="M3 5h12M9 3v2M5 5c0 5 4 8 8 9M13 5c-1 4-4 7-9 9M14 21l4-10 4 10M15.5 18h5"/>';
IC.bulb='<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>';
function pl(k){return !S.pl||S.pl[k]!==false}
function local(t,r){var c=cur();if(!c){newChat();c=cur()}$("i").value="";if($("m").querySelector(".wl"))$("m").innerHTML="";bub("user",t);bub("assistant",r);c.m.push({role:"user",content:t,show:t});c.m.push({role:"assistant",content:r,show:r});if(c.t=="New chat")c.t=t.slice(0,28);sv()}
var _send=send;
send=async function(t,v){
if(busy)return;
t=(t||$("i").value||"").trim();
if(!t||att.length)return _send(t,v);
var m;
if(pl("note")&&(m=t.match(/^(note|likho)[:\s]+(.+)/i))){S.notes=S.notes||[];S.notes.push(m[2]);sv();return local(t,"Note save ho gaya. Agent menu me Notes dekho.")}
if(pl("time")&&/(time kya|kitne baje|aaj ki date|today.?s date|what time|current time|date aur time)/i.test(t))return local(t,new Date().toLocaleString("en-IN",{dateStyle:"full",timeStyle:"short"}));
if(pl("calc")){var e=(m=t.match(/^(calc|calculate|hisab)[:\s]+(.+)/i))?m[2]:((/^[0-9+\-*\/().%\s^]+$/.test(t)&&/[+\-*\/%^]/.test(t))?t:null);
if(e&&/^[0-9+\-*\/().%\s^]+$/.test(e)){try{var r=Function('"use strict";return ('+e.replace(/\^/g,"**")+')')();return local(t,e+" = "+r)}catch(x){return local(t,"Calculation samajh nahi aaya")}}}
return _send(t,v)};
var _SP2=SP;SP=function(){var c=cur(),p=null;if(c&&c.proj)(S.projs||[]).forEach(function(x){if(x.id==c.proj)p=x});return _SP2()+(p?" Project: "+p.n+". Instructions: "+p.ins:"")};
var _nc=newChat;newChat=function(){_nc();var c=cur();if(S.pj&&c){c.proj=S.pj;sv()}};
function agentP(){var T=[["calc","calc","Calculator","Hisab kitab turant"],["clock","time","Date & Time","Abhi ka time"],["note","notes","Notes","Apne notes save karo"],["clip","sum","File Summary","File ka summary"],["lang","tr","Translate","Hindi/English translate"],["pen","rw","Rewrite","Text behtar likho"],["bulb","idea","Ideas","5 naye ideas"]];
openP('<h3>Agent</h3><p>Vexal ke tools. Chuno aur kaam shuru.</p>'+T.map(function(x){return '<button class="mi" data-a="tool" data-v="'+x[1]+'">'+ic(x[0])+'<span>'+x[2]+'<br><small class="mu">'+x[3]+'</small></span></button>'}).join(""))}
function pre(s){closeP();$("i").value=s;$("i").focus()}
ACT.tool=function(n){
if(n=="calc")pre("calc: ");
else if(n=="time"){closeP();send("aaj ki date aur time kya hai")}
else if(n=="notes")notesP();
else if(n=="sum"){pre("Is file ka summary do");ACT.attach()}
else if(n=="tr")pre("Is ko Hindi me translate karo: ");
else if(n=="rw")pre("Is text ko behtar aur professional likho: ");
else if(n=="idea"){closeP();send("Mujhe 5 creative ideas do jinpar main aaj kaam kar sakta hoon")}};
function notesP(){var N=S.notes||[];openP('<h3>Notes</h3><p>Chat me "note: ..." likho, ya yahan add karo.</p>'+N.map(function(x,i){return '<div class="hi"><span>'+esc(x)+'</span><button class="sm" data-a="notedel" data-v="'+i+'">'+ic("trash",18)+'</button></div>'}).join("")+'<input id="nti" placeholder="Naya note"><button class="mi pr c" data-a="noteadd">Save note</button>')}
ACT.noteadd=function(){var v=$("nti").value.trim();if(!v)return;S.notes=S.notes||[];S.notes.push(v);sv();notesP()};
ACT.notedel=function(i){S.notes.splice(i,1);sv();notesP()};
function plugP(){var P=[["calc","Calculator","Math seedha solve"],["time","Date & Time","Time/date bina model ke"],["note","Notes","note: se save"]];
openP('<h3>Plugins</h3><p>Ye tools model se pehle chalte hain, isliye bahut tez hain.</p>'+P.map(function(x){return '<div class="hi"><span>'+x[1]+'<br><small class="mu">'+x[2]+'</small></span><button class="sm row" style="min-width:64px"><span data-a="plug" data-v="'+x[0]+'" class="mi c '+(pl(x[0])?'pr':'')+'" style="margin:0;padding:8px 14px">'+(pl(x[0])?'On':'Off')+'</span></button></div>'}).join(""))}
ACT.plug=function(k){S.pl=S.pl||{};S.pl[k]=!pl(k);sv();plugP()};
function projP(){var h='<h3>Projects</h3><p>Project ke instructions uski nayi chats me lagte hain.</p>';
(S.projs||[]).forEach(function(p){h+='<div class="hi"><span data-a="pjset" data-v="'+p.id+'">'+esc(p.n)+(S.pj==p.id?' <small class="mu">(active)</small>':'')+'</span><button class="sm" data-a="pjdel" data-v="'+p.id+'">'+ic("trash",18)+'</button></div>'});
h+='<input id="pjn" placeholder="Project ka naam"><input id="pji" placeholder="Instructions (jaise: tum coding tutor ho)"><button class="mi pr c" data-a="pjadd">Create project</button>'+(S.pj?'<button class="mi c" data-a="pjset" data-v="0">Project band karo</button>':'');openP(h)}
ACT.pjadd=function(){var n=$("pjn").value.trim();if(!n)return;S.projs=S.projs||[];var p={id:Date.now(),n:n,ins:$("pji").value.trim()};S.projs.push(p);S.pj=p.id;sv();projP()};
ACT.pjset=function(v){S.pj=Number(v)||null;sv();projP()};
ACT.pjdel=function(v){S.projs=(S.projs||[]).filter(function(p){return p.id!=v});if(S.pj==v)S.pj=null;sv();projP()};
ACT.soon=function(n){if(n=="Projects")projP();else if(n=="Plugins")plugP();else if(n=="Agent")agentP();else soonP(n)};
//end
