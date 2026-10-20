function sd(o){$("sb").classList.toggle("o",!!o);$("ov").style.display=o?"block":"none";if(o)dsb()}
function dsb(){
var h='<div class="hi pf">'+ic("user")+'<span><b>'+esc(S.p.n)+'</b></span></div><button class="mi pr" data-a="new">'+ic("plus")+'New chat</button><h4>Chat history</h4>';
h+=S.chats.length?S.chats.map(function(c){return '<div class="hi"><span data-a="open" data-v="'+c.id+'">'+esc(c.t)+'</span><button class="sm" data-a="delc" data-v="'+c.id+'">'+ic("trash",18)+'</button></div>'}).join(""):'<small class="mu">Abhi koi chat nahi</small>';
h+='<h4>Menu</h4>'+[["book","Library","lib"],["spark","Memory","mem"],["folder","Projects","soon"],["plug","Plugins","soon"],["bot","Agent","soon"],["info","About Vexal","about"]].map(function(x){return '<button class="mi" data-a="'+x[2]+'" data-v="'+x[1]+'">'+ic(x[0])+x[1]+'</button>'}).join("");
h+='<h4>Theme</h4><div class="row">'+["dark","light","glass"].map(function(x){return '<button class="'+(S.th==x?"on":"")+'" data-a="th" data-v="'+x+'">'+x+'</button>'}).join("")+'</div><h4>Data</h4><button class="mi" data-a="reset">'+ic("trash")+'Sab data delete</button>';
$("sb").innerHTML=h}
function openP(h){$("pn").innerHTML='<div class="bx"><button class="ib xb" data-a="closeP">'+ic("x")+'</button>'+h+'</div>';$("pn").classList.add("s");sd(0)}
function closeP(){$("pn").classList.remove("s")}
function soonP(n){openP('<h3>'+esc(n)+'</h3><p>Ye feature jald aa raha hai.</p>')}
function libP(){openP('<h3>Library</h3>'+(S.lib.map(function(a,i){return '<div class="hi"><span>'+esc(a.n)+'</span><button class="sm" data-a="useF" data-v="'+i+'">'+ic("plus",18)+'</button><button class="sm" data-a="delF" data-v="'+i+'">'+ic("trash",18)+'</button></div>'}).join("")||'<p>Koi file nahi. Neeche clip se upload karo.</p>'))}
function memP(){openP('<h3>Memory</h3><p>Chat me likho: yaad rakho: meri pasand chai hai</p>'+(S.mem.map(function(x,i){return '<div class="hi"><span>'+esc(x)+'</span><button class="sm" data-a="delM" data-v="'+i+'">'+ic("trash",18)+'</button></div>'}).join("")||'<p>Abhi kuch yaad nahi.</p>'))}
function aboutP(){openP('<h3>About Vexal AI</h3><p>Vexal ek AI hai jo tumhare phone par chalta hai. Games, challenge, collab, creativity aur power, sab iske saath karo.</p>')}
function showAt(){$("at").innerHTML=att.map(function(x){return '<span class="chip">'+ic("clip",14)+esc(x.n)+'</span>'}).join("")}
function upl(){var f=$("f").files[0];if(!f)return;var r=new FileReader();r.onload=function(){var a={n:f.name,t:r.result};S.lib.push(a);att.push(a);sv();showAt()};r.readAsText(f);$("f").value=""}
function vm(o){var v=$("vo");if(o){v.innerHTML='<button class="ib xb" style="position:absolute;top:20px;right:20px" data-a="vclose">'+ic("x")+'</button><div id="vc" data-a="orb">'+ic("mic",64)+'</div><p id="vt">Orb dabake bolo</p>';v.classList.add("s")}else{v.classList.remove("s");speechSynthesis.cancel()}}
function say(t){if(!t)return;speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.lang="hi-IN";u.onend=function(){if($("vt"))$("vt").textContent="Orb dabake bolo"};if($("vt"))$("vt").textContent="Vexal bol raha hai...";speechSynthesis.speak(u)}
function stt(v){var R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R){alert("Is browser me voice input nahi hai");return}
var r=new R();r.lang="hi-IN";
r.onresult=function(e){var t=e.results[0][0].transcript;if(v){$("vt").textContent="Vexal soch raha hai...";send(t,1)}else $("i").value=t};
r.onend=function(){$("mc").classList.remove("rec");if($("vc"))$("vc").classList.remove("on")};
r.onerror=function(){if($("vt"))$("vt").textContent="Mic permission check karo"};
r.start();$("mc").classList.add("rec");if(v){$("vc").classList.add("on");$("vt").textContent="Sun raha hoon..."}}
function showLogin(){$("lg").innerHTML='<div class="bx"><div class="logo big">Vexal<span>AI</span></div><p>Apna profile banao. Ye sirf is phone me save hota hai.</p><input id="ln" placeholder="Naam"><input id="lc" placeholder="Phone ya Gmail (optional)"><input id="ld" type="date"><button class="mi pr c" data-a="login">Continue</button></div>';$("lg").classList.add("s")}
function login(){var n=$("ln").value.trim();if(!n){$("ln").focus();return}S.p={n:n,c:$("lc").value,d:$("ld").value};sv();$("lg").classList.remove("s");dm()}
var ACT={
menu:function(){sd(1)},closeSb:function(){sd(0)},"new":function(){newChat()},voice:function(){vm(1)},vclose:function(){vm(0)},orb:function(){stt(1)},
theme:function(){setTh({dark:"light",light:"glass",glass:"dark"}[S.th])},th:function(x){setTh(x)},
attach:function(){$("f").click()},mic:function(){stt(0)},send:function(){send()},
card:function(i){send(O[i][3])},
open:function(id){S.cur=Number(id);sv();sd(0);dm()},
delc:function(id){S.chats=S.chats.filter(function(c){return c.id!=id});if(S.cur==id)S.cur=null;sv();dsb();dm()},
lib:libP,mem:memP,soon:soonP,about:aboutP,closeP:closeP,
useF:function(i){att.push(S.lib[i]);showAt();closeP()},
delF:function(i){S.lib.splice(i,1);sv();libP()},
delM:function(i){S.mem.splice(i,1);sv();memP()},
reset:function(){if(confirm("Sab data delete karna hai?")){localStorage.removeItem("vx3");location.reload()}},
login:login
};
(function(){
$("bm").innerHTML=ic("menu");$("bt").innerHTML=ic("half");$("bn").innerHTML=ic("plus");$("bv").innerHTML=ic("wave");
$("bf").innerHTML=ic("clip");$("mc").innerHTML=ic("mic");$("bs").innerHTML=ic("send");
$("i").addEventListener("keydown",function(e){if(e.key=="Enter")send()});
$("f").addEventListener("change",upl);
document.addEventListener("click",function(e){var t=e.target.closest("[data-a]");if(!t)return;var f=ACT[t.dataset.a];if(f)f(t.dataset.v)});
ap();if(!S.p)showLogin();else dm();
})();
//end
