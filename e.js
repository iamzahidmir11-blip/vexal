(function(){
if(/^(127\.0\.0\.1|localhost)$/.test(location.hostname))return;
var MODEL="Qwen2.5-0.5B-Instruct-q4f16_1-MLC",eng=null,of=window.fetch;
async function getEng(){
if(eng)return eng;
if(!navigator.gpu)throw new Error("Is browser me WebGPU nahi hai. Chrome update karo.");
var W=await import("https://esm.run/@mlc-ai/web-llm");
eng=await W.CreateMLCEngine(MODEL,{initProgressCallback:function(p){$("at").innerHTML='<span class="chip">'+esc(p.text.slice(0,70))+'</span>'}});
if(!att.length)$("at").innerHTML="";
return eng}
window.fetch=function(u,o){
if(String(u).indexOf("/v1/chat/completions")<0)return of.apply(this,arguments);
var body=JSON.parse(o.body),enc=new TextEncoder();
if(o.signal)o.signal.addEventListener("abort",function(){if(eng)eng.interruptGenerate()});
var rs=new ReadableStream({async start(ctl){
try{var e=await getEng();var it=await e.chat.completions.create({messages:body.messages,stream:true,max_tokens:body.max_tokens||400,temperature:.7});
for await(var ch of it){var c=(ch.choices[0]&&ch.choices[0].delta&&ch.choices[0].delta.content)||"";if(c)ctl.enqueue(enc.encode("data: "+JSON.stringify({choices:[{delta:{content:c}}]})+"\n\n"))}}
catch(err){ctl.enqueue(enc.encode("data: "+JSON.stringify({choices:[{delta:{content:"Error: "+err.message}}]})+"\n\n"))}
ctl.close()}});
return Promise.resolve(new Response(rs,{status:200}))}
})();
//end
