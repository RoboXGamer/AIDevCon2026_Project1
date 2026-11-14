import assert from 'node:assert/strict'
import { baseline, plan, products } from '../src/lib/inventory.ts'
const forecast = baseline()
for (const budget of [0, 100, 5000, 30000, 100000]) {
  const order = plan(forecast, budget)
  assert(order.total <= budget)
  assert.equal(order.total, order.lines.reduce((s,l)=>s+l.quantity*l.cost,0))
  assert(order.lines.every(l=>Number.isInteger(l.quantity)&&l.quantity>0))
  assert.equal(new Set(order.lines.map(l=>l.sku)).size,order.lines.length)
}
const zero = {...forecast,predictions:products.map(p=>({sku:p.sku,predictedUnits:0,reason:'No demand'}))}
assert.equal(plan(zero,30000).lines.length,0)
assert.equal(plan(forecast,0).lines.length,0)
console.log('Reorder checks passed: budget limits, totals, quantities, unique SKUs, and zero demand.')
