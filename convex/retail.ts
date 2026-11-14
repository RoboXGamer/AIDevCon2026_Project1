import { query, mutation, internalMutation } from './_generated/server'
import { v } from 'convex/values'
export const latest = query({ args: {}, handler: async ctx => ({ forecast: await ctx.db.query('forecasts').order('desc').first(), drafts: await ctx.db.query('drafts').order('desc').take(20) }) })
export const storeForecast = internalMutation({ args: { predictions:v.array(v.object({sku:v.string(),predictedUnits:v.number(),reason:v.string()})),summary:v.string() }, handler: async (ctx,args) => ctx.db.insert('forecasts',{...args,source:'Nemotron 3.5 Bolt E4B',createdAt:Date.now()}) })
export const saveDraft = mutation({ args: { id:v.string(), createdAt:v.number(), lines:v.array(v.object({sku:v.string(),name:v.string(),quantity:v.number(),cost:v.number(),supplier:v.string()})), total:v.number() }, handler: async (ctx,args) => {
  if (!args.lines.length || args.lines.some(x=> !Number.isInteger(x.quantity) || x.quantity <= 0 || !Number.isFinite(x.cost) || x.cost < 0)) throw new Error('Invalid order lines')
  const total = args.lines.reduce((s,x)=>s+x.quantity*x.cost,0)
  const existing = await ctx.db.query('drafts').filter(q=>q.eq(q.field('id'),args.id)).first()
  return existing?._id ?? ctx.db.insert('drafts',{...args,total})
} })
