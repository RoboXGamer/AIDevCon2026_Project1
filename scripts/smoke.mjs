import { ConvexHttpClient } from 'convex/browser'
import { makeFunctionReference } from 'convex/server'
import assert from 'node:assert/strict'
process.loadEnvFile('.env.local')
const client = new ConvexHttpClient(process.env.VITE_CONVEX_URL)
const result = await client.action(makeFunctionReference('agent:analyze'), { prompt:'Forecast next seven days under normal trading. Explain the observed trends. This is a demo smoke test.' })
assert.equal(result.predictions.length,6)
assert(result.predictions.every(p=>Number.isInteger(p.predictedUnits)&&p.predictedUnits>=0))
const snapshot = await client.query(makeFunctionReference('retail:latest'),{})
assert.equal(snapshot.forecast.source,'Nemotron 3.5 Bolt E4B')
console.log(JSON.stringify({source:result.source,predictions:result.predictions,trace:result.trace,persisted:!!snapshot.forecast},null,2))
