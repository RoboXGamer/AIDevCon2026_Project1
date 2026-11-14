import { existsSync, readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
let key = process.env.NVIDIA_API_KEY
for (const file of ['.env.local', '.env']) {
  if (!existsSync(file)) continue
  const match = readFileSync(file, 'utf8').match(/^NVIDIA_API_KEY\s*=\s*(.+)$/m)
  if (match) key = match[1].trim().replace(/^['"]|['"]$/g, '')
}
if (!key) { console.error('NVIDIA_API_KEY is missing from .env.local or .env.'); process.exit(1) }
const result = spawnSync(process.execPath, ['node_modules/convex/bin/main.js', 'env', 'set', 'NVIDIA_API_KEY'], { input: key + '\n', encoding:'utf8' })
if (result.status !== 0) { console.error('Could not sync the key. Set NVIDIA_API_KEY in the Convex dashboard.'); process.exit(1) }
console.log('NVIDIA_API_KEY synced to Convex. The value was not printed.')
