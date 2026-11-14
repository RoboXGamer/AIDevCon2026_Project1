process.loadEnvFile('.env.local')
const start = Date.now()
try {
  const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${process.env.NVIDIA_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:'meta/muse-glimmer-30b',messages:[{role:'user',content:'Say hello.'}],max_tokens:128,temperature:0.2,stream:false}),signal:AbortSignal.timeout(45000)})
  const body = await response.json()
  console.log(JSON.stringify({status:response.status,seconds:(Date.now()-start)/1000,message:body.choices?.[0]?.message,error:body.error},null,2))
} catch(e) { console.error(e.message);process.exitCode=1 }
