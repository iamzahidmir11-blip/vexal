IC.check='<path d="M5 12l5 5L20 7"/>';
IC.copy='<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>';
IC.stop='<rect x="6" y="6" width="12" height="12" rx="3" fill="currentColor"/>';
IC.cog='<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>';
IC.down='<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>';
function md(t){var h=esc(t);
h=h.replace(/```([\s\S]*?)```/g,function(m,c){return '<pre><code>'+c.replace(/^\w*\n/,'')+'</code></pre>'});
h=h.replace(/`([^`\n]+)`/g,'<code>$1</code>');
h=h.replace(/\*\*([^*\n]+)\*\*/g,'<b>$1</b>');
return h}
function fin(d,a){d.dataset.raw=a;d.innerHTML=md(a)+'<button class="cp">'+ic("copy",16)+'</button>'}
function bub(r,t){var d=document.createElement("div");d.className="b"+(r=="user"?" u":"");
if(r=="user")d.textContent=t;else if(t)fin(d,t);
$("m").appendChild(d);$("m").scrollTop=1e9;return d}
function len(){return (S.set&&S.set.len)||"normal"}
var ctl=null;
function setBusy(b){busy=b;var s=$("bs");s.innerHTML=ic(b?"stop":"send");s.dataset.a=b?"stop":"send"}
var _SP=SP;SP=function(){return _SP()+{short:" Bahut chhota jawab do, 1-2 line.",normal:"",detail:" Detail me samjhao."}[len()]};
var _dsb=dsb;dsb=function(){_dsb();$("sb").insertAdjacentHTML("beforeend",'<h4>More</h4><button class="mi" data-a="settings">'+ic("cog")+'Settings</button><button class="mi" data-a="export">'+ic("down")+'Export chat</button>')};
function setP(){openP('<h3>Settings</h3><p>Tumhara naam</p><input id="sn" value="'+esc(S.p.n)+'"><p>Reply length</p><div class="row">'+["short","normal","detail"].map(function(x){return '<button class="'+(len()==x?"on":"")+'" data-a="len" data-v="'+x+'">'+x+'</button>'}).join("")+'</div><button class="mi pr c" data-a="saveS">Save</button>')}
ACT.settings=setP;
ACT.len=function(x){S.set=S.set||{};S.set.len=x;sv();var bs=document.querySelectorAll('[data-a="len"]');for(var i=0;i<bs.length;i++)bs[i].classList.toggle("on",bs[i].dataset.v==x)};
ACT.saveS=function(){var n=$("sn").value.trim();if(n){S.p.n=n;sv()}closeP();dm()};
ACT.stop=function(){if(ctl)ctl.abort()};
ACT.export=function(){var c=cur();if(!c||!c.m.length){soonP("Pehle koi chat karo");return}
var t=c.m.map(function(x){return (x.role=="user"?"Me: ":"Vexal: ")+x.show}).join("\n\n");
var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([t],{type:"text/plain"}));a.download="vexal-chat.txt";a.click()};
document.addEventListener("click",function(e){var t=e.target.closest(".cp");if(!t)return;
try{navigator.clipboard.writeText(t.parentNode.dataset.raw||"")}catch(x){}
t.innerHTML=ic("check",16);setTimeout(function(){t.innerHTML=ic("copy",16)},1200)});
async function send(t,v){
if(busy)return;
t=(t||$("i").value||"").trim();
if(!t&&!att.length)return;
$("i").value="";
var c=cur();if(!c){newChat();c=cur()}
var mm=t.match(/^(yaad rakho|remember)[:,\s]+(.+)/i);if(mm)S.mem.push(mm[2]);
var full=t,sh=t;
if(att.length){full+="\n\n"+att.map(function(a){return "[File: "+a.n+"]\n"+a.t.slice(0,3000)}).join("\n\n");sh+="\n"+att.map(function(a){return "[file] "+a.n}).join(" ");att=[];$("at").innerHTML=""}
if($("m").querySelector(".wl"))$("m").innerHTML="";
bub("user",sh);c.m.push({role:"user",content:full,show:sh});
if(c.t=="New chat")c.t=(t||"File chat").slice(0,28);
var d=bub("assistant","");d.innerHTML='<span class="dots"><i></i><i></i><i></i></span>';
var a="",err="";setBusy(1);ctl=new AbortController();
try{
var mx={short:150,normal:400,detail:900}[len()];
var msgs=[{role:"system",content:SP()}].concat(c.m.slice(-12).map(function(x){return {role:x.role,content:x.content}}));
var r=await fetch("/v1/chat/completions",{method:"POST",signal:ctl.signal,headers:{"Content-Type":"application/json"},body:JSON.stringify({stream:true,max_tokens:mx,temperature:0.7,messages:msgs})});
if(!r.ok)throw new Error("HTTP "+r.status);
var rd=r.body.getReader(),dec=new TextDecoder(),b="";
while(true){var q=await rd.read();if(q.done)break;b+=dec.decode(q.value,{stream:true});var L=b.split("\n");b=L.pop();
for(var j=0;j<L.length;j++){var l=L[j];if(l.indexOf("data: ")!==0||l.indexOf("[DONE]")>0)continue;
try{a+=JSON.parse(l.slice(6)).choices[0].delta.content||"";d.innerHTML=md(a);$("m").scrollTop=1e9}catch(e){}}}
}catch(e){if(e.name!="AbortError")err="Error: server chalu hai? ("+e.message+")"}
setBusy(0);ctl=null;
if(err&&!a)d.textContent=err;else fin(d,a||"(roka gaya)");
c.m.push({role:"assistant",content:a||"...",show:a||err||"(roka gaya)"});sv();
if(v&&a)say(a)}
//end
