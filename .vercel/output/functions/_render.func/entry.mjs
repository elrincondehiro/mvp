import { r as renderers } from './chunks/_@astro-renderers_Bk5FpUEJ.mjs';
import { c as createExports } from './chunks/entrypoint_Cnj9lKix.mjs';
import { manifest } from './manifest_DlxLDaY4.mjs';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/index.astro.mjs');
const _page1 = () => import('./pages/_image.astro.mjs');
const pageMap = new Map([
    ["src/pages/index.astro", _page0],
    ["node_modules/.pnpm/astro@5.0.0-beta.6_rollup@4.24.3_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic.js", _page1]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "f402e5e5-8a63-4071-b82a-c268390884b2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
