// Combined build — assembles three apps into ONE static deployment:
//   main Astro  ->  /            (static)
//   Next.js     ->  /construction (static export, basePath /construction)
//   Vite/React  ->  /remodeling3  (static, base /remodeling3/)
// Each sub-app is built with its assets prefixed for its sub-path, then copied
// into public/ so the final `astro build` folds everything into one static tree (dist/).
import { execSync } from 'node:child_process';
import { cpSync, rmSync } from 'node:fs';

// Sub-app installs may pull Playwright transitively — never download browsers during a deploy build.
process.env.PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '1';

function run(cmd, cwd, env = {}) {
  console.log(`\n[build-all] (${cwd}) $ ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit', env: { ...process.env, ...env } });
}

// 1) Construction — Next.js static export mounted at /construction.
//    next.config.ts enables output:'export' + basePath:'/construction' when HUB_EXPORT=1.
run('npm install --no-audit --no-fund', 'apps/construction');
run('npm run build', 'apps/construction', { HUB_EXPORT: '1', NEXT_PUBLIC_HUB_BASE: '/construction' });
rmSync('public/construction', { recursive: true, force: true });
cpSync('apps/construction/out', 'public/construction', { recursive: true });
console.log('[build-all] construction -> public/construction');

// 2) Remodeling3 — Vite build mounted at /remodeling3 (base set in vite.config.ts).
run('npm install --no-audit --no-fund', 'apps/remodeling3');
run('npm run build', 'apps/remodeling3');
rmSync('public/remodeling3', { recursive: true, force: true });
cpSync('apps/remodeling3/dist', 'public/remodeling3', { recursive: true });
console.log('[build-all] remodeling3 -> public/remodeling3');

// 3) Main Astro site (static) — folds public/ (incl. the two sub-apps) into dist/.
run('npx astro build', '.');
console.log('\n[build-all] done: dist/ serves /, /construction, /remodeling3');
