import { d as decodeKey } from './chunks/astro/server_Coxwvvuj.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DVu0Z7iE.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/ElRinconDeHiro/proyecto/mvp/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.0.0-beta.6_rollup@4.24.3_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/ElRinconDeHiro/proyecto/mvp/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.0.0-beta.6_rollup@4.24.3_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/ElRinconDeHiro/proyecto/mvp/node_modules/.pnpm/astro@5.0.0-beta.6_rollup@4.24.3_typescript@5.6.3/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CnBrJPoB.mjs","C:/ElRinconDeHiro/proyecto/mvp/node_modules/.pnpm/astro@5.0.0-beta.6_rollup@4.24.3_typescript@5.6.3/node_modules/astro/dist/env/setup.js":"chunks/setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_DlxLDaY4.mjs","@/components/CartDisplay.svelte":"_astro/CartDisplay.DbOocq4i.js","@astrojs/svelte/client-v5.js":"_astro/client-v5.KaZVKfzy.js","C:/ElRinconDeHiro/proyecto/mvp/src/components/CartItemPage.astro?astro&type=script&index=0&lang.ts":"_astro/CartItemPage.astro_astro_type_script_index_0_lang.Duq7M4YS.js","C:/ElRinconDeHiro/proyecto/mvp/src/components/AddToCartBtn.astro?astro&type=script&index=0&lang.ts":"_astro/AddToCartBtn.astro_astro_type_script_index_0_lang.B8R44iTl.js","C:/ElRinconDeHiro/proyecto/mvp/node_modules/.pnpm/@vercel+speed-insights@1.0.14_svelte@5.1.9/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.C4Y-xgaG.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/ElRinconDeHiro/proyecto/mvp/src/components/CartItemPage.astro?astro&type=script&index=0&lang.ts","const n=document.querySelector('input[name=\"quantity\"]'),t=document.querySelector(\"#addToCartButton\");n&&t&&n.addEventListener(\"change\",o=>{const e=parseInt(o.target.value);console.log(e);const a=JSON.parse(t.dataset.productQty||\"{}\");console.log(a),t.dataset.productQty=JSON.stringify(e)});"],["C:/ElRinconDeHiro/proyecto/mvp/node_modules/.pnpm/@vercel+speed-insights@1.0.14_svelte@5.1.9/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts","var u=\"@vercel/speed-insights\",l=\"1.0.14\",f=()=>{window.si||(window.si=function(...n){(window.siq=window.siq||[]).push(n)})};function v(){return typeof window<\"u\"}function p(){try{const e=\"production\"}catch{}return\"production\"}function a(){return p()===\"development\"}function w(e,n){if(!e||!n)return e;let r=e;try{const s=Object.entries(n);for(const[i,t]of s)if(!Array.isArray(t)){const o=c(t);o.test(r)&&(r=r.replace(o,`/[${i}]`))}for(const[i,t]of s)if(Array.isArray(t)){const o=c(t.join(\"/\"));o.test(r)&&(r=r.replace(o,`/[...${i}]`))}return r}catch{return e}}function c(e){return new RegExp(`/${m(e)}(?=[/?#]|$)`)}function m(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,\"\\\\$&\")}var d=\"https://va.vercel-scripts.com/v1/speed-insights\",h=`${d}/script.js`,S=`${d}/script.debug.js`,g=\"/_vercel/speed-insights/script.js\";function R(e={}){var n;if(!v()||e.route===null)return null;f();const s=!!e.dsn?h:g,i=e.scriptSrc||(a()?S:s);if(document.head.querySelector(`script[src*=\"${i}\"]`))return null;e.beforeSend&&((n=window.si)==null||n.call(window,\"beforeSend\",e.beforeSend));const t=document.createElement(\"script\");return t.src=i,t.defer=!0,t.dataset.sdkn=u+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=l,e.sampleRate&&(t.dataset.sampleRate=e.sampleRate.toString()),e.route&&(t.dataset.route=e.route),e.endpoint&&(t.dataset.endpoint=e.endpoint),e.dsn&&(t.dataset.dsn=e.dsn),a()&&e.debug===!1&&(t.dataset.debug=\"false\"),t.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${i}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(t),{setRoute:o=>{t.dataset.route=o??void 0}}}customElements.define(\"vercel-speed-insights\",class extends HTMLElement{constructor(){super();try{const n=JSON.parse(this.dataset.props??\"{}\"),r=JSON.parse(this.dataset.params??\"{}\"),s=w(this.dataset.pathname??\"\",r);R({route:s,...n,framework:\"astro\",beforeSend:window.speedInsightsBeforeSend})}catch(n){throw new Error(`Failed to parse SpeedInsights properties: ${n}`)}}});"]],"assets":["/_astro/index.b0D6K3qe.css","/favicon.svg","/_astro/AddToCartBtn.astro_astro_type_script_index_0_lang.B8R44iTl.js","/_astro/CartDisplay.DbOocq4i.js","/_astro/cartStore.2GLpkHHr.js","/_astro/client-v5.KaZVKfzy.js","/_astro/index.Cy1Qvswl.css","/_astro/render.DrD4ENwZ.js","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"tDDrFCjFFyAPjNWjG0gdB5tsL7zz3OX05kl9FEvVFNc=","envGetSecretEnabled":true});

export { manifest };
