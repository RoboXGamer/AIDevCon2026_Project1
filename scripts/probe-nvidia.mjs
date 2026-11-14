process.loadEnvFile('.env.local')
const start = Date.now()
try {
  const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${process.env.NVIDIA_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:'nvidia/nemotron-3.5-bolt-e4b',messages:[{role:'user',content:'Say hello.'}],max_tokens:128,temperature:1,top_p:0.95,chat_template_kwargs:{enable_thinking:false},stream:false}),signal:AbortSignal.timeout(45000)})
  const body = await response.json()
  console.log(JSON.stringify({status:response.status,seconds:(Date.now()-start)/1000,message:body.choices?.[0]?.message,error:body.error},null,2))
} catch(e) { console.error(e.message);process.exitCode=1 }
