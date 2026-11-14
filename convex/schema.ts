import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
export default defineSchema({
  forecasts: defineTable({ predictions: v.array(v.object({ sku:v.string(), predictedUnits:v.number(), reason:v.string() })), summary:v.string(), source:v.string(), createdAt:v.number() }),
  drafts: defineTable({ id:v.string(), createdAt:v.number(), lines:v.array(v.object({ sku:v.string(), name:v.string(), quantity:v.number(), cost:v.number(), supplier:v.string() })), total:v.number() }),
})
