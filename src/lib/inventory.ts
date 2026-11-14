export type Product = { sku: string; name: string; category: string; stock: number; cost: number; leadDays: number; supplier: string; sales: number[] }
export const products: Product[] = [
  { sku: 'PAN-001', name: 'Oat Milk · 1L', category: 'Dairy alternatives', stock: 24, cost: 110, leadDays: 3, supplier: 'Green Basket', sales: [7,8,6,9,11,14,10,8,9,10,12,15,17,13,11,12,14,15,18,21,16,14,16,17,19,22,25,20] },
  { sku: 'PAN-002', name: 'Arabica Coffee · 250g', category: 'Coffee & tea', stock: 32, cost: 240, leadDays: 5, supplier: 'Roast Collective', sales: [3,4,3,5,6,8,5,4,5,4,6,7,9,6,5,5,6,7,8,10,7,6,7,6,8,9,12,8] },
  { sku: 'PAN-003', name: 'Sourdough Loaf', category: 'Bakery', stock: 18, cost: 85, leadDays: 1, supplier: 'Daily Bread Co.', sales: [10,11,9,12,14,18,15,11,12,10,13,15,19,16,12,12,11,14,15,20,16,12,13,11,14,16,21,17] },
  { sku: 'PAN-004', name: 'Organic Honey · 500g', category: 'Pantry', stock: 65, cost: 180, leadDays: 4, supplier: 'Green Basket', sales: [2,3,2,2,3,4,3,2,2,3,2,4,4,3,2,3,2,3,3,4,3,2,3,2,3,4,4,3] },
  { sku: 'PAN-005', name: 'Almond Granola · 400g', category: 'Breakfast', stock: 14, cost: 160, leadDays: 3, supplier: 'Green Basket', sales: [3,4,3,4,5,7,5,4,4,5,5,7,8,6,5,5,6,6,8,9,7,6,7,7,8,10,11,9] },
  { sku: 'PAN-006', name: 'Matcha Tea · 50g', category: 'Coffee & tea', stock: 48, cost: 290, leadDays: 7, supplier: 'Roast Collective', sales: [2,2,3,2,3,4,3,3,2,3,3,4,5,3,3,3,4,3,5,5,4,3,4,4,4,5,6,4] },
]
export type Prediction = { sku: string; predictedUnits: number; reason: string }
export type Forecast = { predictions: Prediction[]; summary: string; source: string; createdAt: number }
export type Draft = { id: string; createdAt: number; lines: { sku: string; name: string; quantity: number; cost: number; supplier: string }[]; total: number }
export const money = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
export function baseline(): Forecast {
  return { source: 'Local baseline', createdAt: Date.now(), summary: 'Preview based on the last 7 days of sample sales. Run the AI agent for a model-generated forecast.', predictions: products.map(p => ({ sku: p.sku, predictedUnits: p.sales.slice(-7).reduce((a,b) => a+b,0), reason: 'Last week’s sales repeated as a simple comparison baseline.' })) }
}
export function plan(forecast: Forecast, budget: number): Draft {
  let remaining = budget
  const lines: Draft['lines'] = []
  const sorted = [...products].sort((a,b) => a.stock/(a.sales.slice(-7).reduce((s,x)=>s+x,0)/7) - b.stock/(b.sales.slice(-7).reduce((s,x)=>s+x,0)/7))
  for (const p of sorted) {
    const predicted = forecast.predictions.find(x => x.sku === p.sku)?.predictedUnits ?? 0
    const target = Math.ceil(predicted * (7 + p.leadDays) / 7 * 1.15)
    const quantity = Math.max(0, Math.min(target - p.stock, Math.floor(remaining / p.cost)))
    if (quantity) { lines.push({ sku:p.sku, name:p.name, quantity, cost:p.cost, supplier:p.supplier }); remaining -= quantity*p.cost }
  }
  return { id: `PO-${Date.now().toString().slice(-7)}`, createdAt: Date.now(), lines, total: budget - remaining }
}
