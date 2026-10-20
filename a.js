var $=function(i){return document.getElementById(i)};
var IC={
menu:'<path d="M3 6h18M3 12h18M3 18h12"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/>',
clip:'<path d="M21 11l-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8"/>',
send:'<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
wave:'<path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4"/>',
trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
book:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
spark:'<path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z"/>',
folder:'<path d="M3 6a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
plug:'<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4"/>',
bot:'<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 14h.01M15 14h.01"/>',
info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
x:'<path d="M18 6L6 18M6 6l12 12"/>',
game:'<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10v5M4.5 12.5h5M16 11h.01M18 14h.01"/>',
bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 21a7 7 0 0 1 14 0M17 4a3.5 3.5 0 0 1 0 7M22 21a7 7 0 0 0-4-6"/>',
pen:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
half:'<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'
};
function ic(n,s){s=s||22;return '<svg viewBox="0 0 24 24" width="'+s+'" height="'+s+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+IC[n]+'</svg>'}
var S=null;try{S=JSON.parse(localStorage.vx3||"null")}catch(e){}
S=S||{p:null,chats:[],cur:null,mem:[],lib:[],th:"dark"};
var att=[],busy=0;
function sv(){try{localStorage.vx3=JSON.stringify(S)}catch(e){}}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var O=[
["game","Play Games","20 questions, riddles, quiz","Chalo ek game khelte hain. 20 questions ya riddles shuru karo."],
["target","Challenge Vexal","Mushkil sawal ya task do","Mujhe ek mushkil challenge do, aur main tumhe bhi challenge dunga."],
["users","Collab with Vexal","Saath milke kuch banao","Mere saath milke ek idea ya kahani banao, ek ek step me."],
["pen","Creativity","Poem, story, ideas","Mujhe ek creative poem ya chhoti kahani likh ke do."],
["bolt","Vexal Power","Dekho Vexal kya kar sakta hai","Batao tum kya kya kar sakte ho, 5 powerful cheezein dikhao."]
];
function SP(){return "Tum Vexal AI ho, ek helpful, friendly aur neutral AI assistant. Sabke saath respect se baat karo. Greeting ke liye simple Hello ya Hi use karo. User jis bhasha me baat kare (Hindi, Hinglish ya English), usi me jawab do. Jawab chhote aur saaf rakho."+(S.p?" User ka naam "+S.p.n+".":"")+(S.mem.length?" User ke baare me yaad rakhi baatein: "+S.mem.join("; ")+".":"")}
function ap(){document.body.className=S.th}
function setTh(x){S.th=x;ap();sv();dsb()}
function cur(){for(var i=0;i<S.chats.length;i++)if(S.chats[i].id==S.cur)return S.chats[i];return null}
function newChat(){var c={id:Date.now(),t:"New chat",m:[]};S.chats.unshift(c);S.cur=c.id;sv();sd(0);dm()}
function bub(r,t){var d=document.createElement("div");d.className="b"+(r=="user"?" u":"");d.textContent=t;$("m").appendChild(d);$("m").scrollTop=1e9;return d}
function dm(){var c=cur(),m=$("m");m.innerHTML="";
if(!c||!c.m.length){var h='<div class="wl"><h1>Hello, '+esc(S.p.n)+'</h1><p>Main Vexal AI hoon. Aaj kya karein?</p>';
O.forEach(function(x,i){h+='<button class="cd" style="animation-delay:'+(i*80)+'ms" data-a="card" data-v="'+i+'"><i>'+ic(x[0],24)+'</i><span><b>'+x[1]+'</b><small>'+x[2]+'</small></span></button>'});
m.innerHTML=h+'</div>';return}
c.m.forEach(function(x){bub(x.role,x.show)})}
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
var a="";busy=1;
try{
var msgs=[{role:"system",content:SP()}].concat(c.m.slice(-12).map(function(x){return {role:x.role,content:x.content}}));
var r=await fetch("/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({stream:true,messages:msgs})});
if(!r.ok)throw new Error("HTTP "+r.status);
var rd=r.body.getReader(),dec=new TextDecoder(),b="";
while(true){var q=await rd.read();if(q.done)break;b+=dec.decode(q.value,{stream:true});var L=b.split("\n");b=L.pop();
for(var j=0;j<L.length;j++){var l=L[j];if(l.indexOf("data: ")!==0||l.indexOf("[DONE]")>0)continue;
try{a+=JSON.parse(l.slice(6)).choices[0].delta.content||"";d.textContent=a;$("m").scrollTop=1e9}catch(e){}}}
}catch(e){d.textContent="Error: server chalu hai? ("+e.message+")"}
busy=0;c.m.push({role:"assistant",content:a||"...",show:a||d.textContent});sv();
if(v&&typeof say=="function")say(a)}
//end
