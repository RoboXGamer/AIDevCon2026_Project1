# Shelfwise

Shelfwise turns sample retail sales and inventory into a seven-day demand estimate and a budgeted purchase order draft. Built for SAP Labs' AI DevCon 2.0, it shows how an LLM can use sales data while application code handles inventory and spending rules.

**[Open the live demo](https://aidevcon.netlify.app/)** · The dashboard uses the name **StockPulse**.

## Try it

1. Open **Demand & Reorder**. The starting baseline repeats the previous seven days of sales.
2. Click **Run Forecast** with the default prompt or try the weekend promotion scenario. Open **Forecast Details** to review estimates and the model's reasoning by product.
3. Set a purchase budget in INR, select products, and review and save a purchase order draft.
4. Open **Purchase Orders** to review saved drafts and export them as CSV.

## How it works

- **Estimate demand.** A Convex action calls NVIDIA NIM (Nemotron 3.5 Bolt E4B). The model uses `get_sales_history` to retrieve sample sales and `submit_forecast` to return a seven-day unit total for each SKU. The action validates the response and persists it in Convex.
- **Plan purchases.** TypeScript code allocates the budget to products with the lowest historical stock coverage first. Target stock covers seven forecast days plus supplier lead time, with a 15% buffer. The planner subtracts stock on hand and caps quantities to fit the remaining budget.
- **Review results.** The TanStack Start and React dashboard displays stockout risk, forecasts, and recommended reorder quantities. Convex stores saved drafts for review and CSV export. The app never sends orders to suppliers.

The [sample inventory](src/lib/inventory.ts) contains six products with 28 days of synthetic sales per product, plus stock levels, costs, suppliers, and lead times. The chart shows the forecast daily average. Demand estimates are unvalidated and have never been backtested. The hosted demo is a shared workspace without sign-in.

## Run locally

You'll need Node.js, pnpm, a Convex development deployment, and an NVIDIA API key with access to `nvidia/nemotron-3.5-bolt-e4b` for model calls.

```sh
pnpm install
pnpm convex dev
```

Convex writes `VITE_CONVEX_URL` to `.env.local`. Add `NVIDIA_API_KEY` to the Convex deployment's environment variables in the dashboard. Keep the key on the server and omit the `VITE_` prefix.

In another terminal, start the app and open [localhost:3000](http://localhost:3000).

```sh
pnpm dev
```

## Checks

```sh
pnpm exec tsc --noEmit
pnpm build
node scripts/check-reorder.mjs
```

To verify the model and persistence together, run `node scripts/smoke.mjs` against a configured development deployment. It makes a real NVIDIA API call and writes a forecast to that deployment.
