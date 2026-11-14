import assert from 'node:assert/strict'
import { ConvexHttpClient } from 'convex/browser'
import { makeFunctionReference } from 'convex/server'
import { baseline, plan } from '../src/lib/inventory.ts'
process.loadEnvFile('.env.local')
const client = new ConvexHttpClient(process.env.VITE_CONVEX_URL)
const draft = plan(baseline(),5000)
await client.mutation(makeFunctionReference('retail:saveDraft'),draft)
const result = await client.query(makeFunctionReference('retail:latest'),{})
assert(result.drafts.some(d=>d.id===draft.id&&d.total===draft.total))
console.log('Convex draft save/read passed; a sample INR 5,000-budget draft is available in Purchase orders.')
