# Shelfwise

A retail demand and reorder agent built with TanStack Start, React, TypeScript, pnpm, Convex, and NVIDIA NIM (`meta/muse-glimmer-30b`). Netlify build configuration is included; the app has not been published.

## Run

```sh
pnpm install
pnpm convex dev
```

Convex writes `VITE_CONVEX_URL` into `.env.local`. Set `NVIDIA_API_KEY` in the Convex dashboard under deployment settings → environment variables. Alternatively, put it in `.env.local` and run `node scripts/sync-nvidia-key.mjs` to transfer it securely to Convex. Never prefix the NVIDIA key with `VITE_`.

In another terminal:

```sh
pnpm dev
```

Open http://localhost:3000.

## Demo flow

1. Inspect the sample inventory and last-week baseline.
2. Click **Run demand forecast**. The model calls `get_sales_history`, then `submit_forecast`; the server validates all six predictions and saves them in Convex.
3. Select a product to inspect sales and the seven-day forecast average.
4. Try the weekend promotion scenario and rerun the forecast.
5. Set a purchase budget, review the reorder draft, then save it.
6. Open **Purchase orders** and export a CSV.

Reorders prioritize products with the lowest historical stock coverage. Target stock covers seven forecast days plus supplier lead time with a 15% buffer. Quantities stay within the budget. All orders are drafts; nothing is sent to suppliers.

## Data and prediction limits

The six products, inventory, costs, suppliers, and 28 daily sales values are synthetic demonstration data (`src/lib/inventory.ts`). Before AI analysis, the app repeats last week's sales as an explicitly labelled local baseline. Muse Glimmer generates unvalidated LLM demand estimates, not a trained or backtested forecasting model. The chart shows forecast **daily average**, not individual daily predictions. No accuracy claim is made. Review perishability, pack sizes, and assumptions before real purchasing.

This is a shared demo workspace without authentication. Add authentication, ownership checks, and rate limits before exposing the deployment for real use.

## Checks

```sh
pnpm exec tsc --noEmit
pnpm build
node scripts/check-reorder.mjs
node scripts/smoke.mjs
```

The smoke test makes a real NVIDIA API request and saves a forecast to the configured development Convex deployment. It requires a valid key and model access.
