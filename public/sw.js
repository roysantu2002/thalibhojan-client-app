if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,i,n)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const c={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return a;case"module":return c;default:return e(s)}}))).then((e=>{const s=n(...e);return a.default||(a.default=s),a}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/128-e5761c5c7f237188ae78.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/17007de1-3c4f7813c411a2d3b36d.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/30-84414312677734ebeb1a.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/322-00f83aa000f2a5f3c6cf.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/490-ce2efadd29d0c9f251f6.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/5-22158524b3b84066a175.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/623-6a252e01017ad67a81ac.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/653.4553a06d0eb7634c93fe.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/75-7c453088638fcdf9a176.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/764-98c99c61f67ca61e79c3.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/897-d2ef53630855508089ea.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/98-2a51db28de075cb1a300.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/b98bc7c3-1667fc00739ab1197a7f.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/framework-b5f3c897a40b4b93d7e6.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/main-557876e01d171180ba8f.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/Page404-bc102b5e3fb1e3c31575.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/_app-54657cecc2d177bc7c32.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/_error-70375524866f704e88d0.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/about-79023d6f0c202ff0a1d0.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/checkout-269c8ab91c574c14770e.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/contact-656be5295e088d29b19c.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/feedback-83912cd8092ff9a4ed1d.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/forgotpassword-2cc0ffae422d230ac9bf.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/index-c880d25d47cf3a1fe1b8.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/orders-cb25868be242becb0a70.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/phoneregistration-76440880afea50ee69d3.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/placeorder-e98f5e1e59883f60a36d.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/register-c53205fa8251899e4ea1.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/sellerdashboard-9f53bfcfc8fa7636e190.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/signin-dad0d437d3966150401a.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/pages/signup-3f74a29101b471f4b28f.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/polyfills-e7a279300235e161e32a.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/chunks/webpack-80b252e69b42e1703068.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/css/fab7432511e1ccf46e6d.css",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/hqBaCy5Tq3hMUFc1YiFwj/_buildManifest.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_next/static/hqBaCy5Tq3hMUFc1YiFwj/_ssgManifest.js",revision:"hqBaCy5Tq3hMUFc1YiFwj"},{url:"/_redirects",revision:"6a02faf7ea2a9584134ffe15779a0e44"},{url:"/apple-icon.png",revision:"c349d68fb4ec8df7d41e975e6e7ffe89"},{url:"/assets/style.css",revision:"d7f54db20b67efe4188ee8eb2ee4d14d"},{url:"/favicon-16x16.png",revision:"801e7a8e14b9c5dbd06319f69ed4beea"},{url:"/favicon-32x32.png",revision:"8c358c98f83d650e4e50d550972d3ad3"},{url:"/fonts/Branch.ttf",revision:"b166c995c21a38b56fc84aa7dd196c65"},{url:"/fonts/GothamBook.ttf",revision:"ca6e213b5621a1a11a11c7f4c65023cd"},{url:"/icons/apple-icon-180.png",revision:"5beb6b49fd74da5d2d1072a64e0ab17f"},{url:"/icons/apple-splash-1125-2436.jpg",revision:"8391391fac0d5d66eef4a05ee7e109d7"},{url:"/icons/apple-splash-1136-640.jpg",revision:"bdee91c18e98df137753e3003f2ac8fa"},{url:"/icons/apple-splash-1170-2532.jpg",revision:"d9008d83532a87ea06121cdb976d68f1"},{url:"/icons/apple-splash-1242-2208.jpg",revision:"cb12d72f3689efc84b4f4b409b8949c4"},{url:"/icons/apple-splash-1242-2688.jpg",revision:"63ad7b612e791c0d6d01e6eb0f34009a"},{url:"/icons/apple-splash-1284-2778.jpg",revision:"a2e00b17af8e6b2e1667f0e5f83abd23"},{url:"/icons/apple-splash-1334-750.jpg",revision:"2eb60c2c9ceb633f33de6e92bb87cf1f"},{url:"/icons/apple-splash-1536-2048.jpg",revision:"46958e1e63edba33b1bb3b853b3207d7"},{url:"/icons/apple-splash-1620-2160.jpg",revision:"efe39f4d16bb8218b71b72926b4d29cb"},{url:"/icons/apple-splash-1668-2224.jpg",revision:"c42df372ed2c719538eb035187fa9670"},{url:"/icons/apple-splash-1668-2388.jpg",revision:"40a1b2e0f9940e03435725df823c32f6"},{url:"/icons/apple-splash-1792-828.jpg",revision:"9c0f73e940984dd7d51e704513ca0d35"},{url:"/icons/apple-splash-2048-1536.jpg",revision:"9d14f165dcfb84f91adb10f6c8295a66"},{url:"/icons/apple-splash-2048-2732.jpg",revision:"bbcb357118722139a80abbeb90584a11"},{url:"/icons/apple-splash-2160-1620.jpg",revision:"b2666cb9ebb6b0d42880523197786fb3"},{url:"/icons/apple-splash-2208-1242.jpg",revision:"08a4ca10d5fb4ebdaf9afdf80cbe8808"},{url:"/icons/apple-splash-2224-1668.jpg",revision:"9c7b9ba8af97ffa90d073bc49fddd47c"},{url:"/icons/apple-splash-2388-1668.jpg",revision:"d9f8d9f5f39039af223ed7bc0ab42e98"},{url:"/icons/apple-splash-2436-1125.jpg",revision:"38d3080f097d037b179bf65dc5b76b8d"},{url:"/icons/apple-splash-2532-1170.jpg",revision:"d60d6d6875501eb23cd21544c9cb09c6"},{url:"/icons/apple-splash-2688-1242.jpg",revision:"fb71daa2adf178de4923c0866cf9ed79"},{url:"/icons/apple-splash-2732-2048.jpg",revision:"2f225479f8cc45ba00baaf14e4870bd8"},{url:"/icons/apple-splash-2778-1284.jpg",revision:"2e13eb98c13e9cd45976680fd0fc7f96"},{url:"/icons/apple-splash-640-1136.jpg",revision:"b6f2858d738258e46efc6c311b120cec"},{url:"/icons/apple-splash-750-1334.jpg",revision:"a39ae25543d0ba4ab5a9f2340d6d9f3c"},{url:"/icons/apple-splash-828-1792.jpg",revision:"874021dfb867a33f9fa3c3506f02651a"},{url:"/icons/manifest-icon-192.png",revision:"b1282cfe6298cddb81e3fe51b6f74f2b"},{url:"/icons/manifest-icon-512.png",revision:"2979eacad3e32a7abbb6e0ff760bcb26"},{url:"/images/3-portion.png",revision:"4d5097a6e56cbd8ad22fe3d2aa9abae6"},{url:"/images/5-portion.png",revision:"8c4aff223a1331b8862dee37545524d3"},{url:"/images/8-portion.png",revision:"78f98d0822240e102529d72d32bf54a2"},{url:"/images/8portion/8-portion-chicken.png",revision:"948844bdf2216ff6aa052a392d1e44a8"},{url:"/images/8portion/8-portion-egg.png",revision:"ee0b0c142c8e837ccc5359ec52abfc23"},{url:"/images/8portion/8-portion-fish.png",revision:"748f941256dccbe5e683873123d0c760"},{url:"/images/8portion/8-portion-mutton.png",revision:"0c1162b8a189468d75050063b7c88cee"},{url:"/images/8portion/8-portion-veg.png",revision:"9d164e47b093f0aff6cc4c333a94793d"},{url:"/images/appHero.png",revision:"b15fa8c26d83c88b958623efd8b2ffbe"},{url:"/images/contact.svg",revision:"8fd5ef5b50b5b715ea606fba4fec52a6"},{url:"/images/desktop/main-banner-01.png",revision:"7a7e7da89b742956b12a13e8a6385b79"},{url:"/images/desktop/main-banner-02.png",revision:"c34c290afc056b787d18b8176fcd5ad2"},{url:"/images/desktop/main-banner-03.png",revision:"3c326a301b283dc806753d0527aa6178"},{url:"/images/desktop/main-banner-04.png",revision:"a1095af4d33d1c4b46d6cfba0a90f4ae"},{url:"/images/flow/D.png",revision:"01be5a365cd7a7db8fdc99589ded4d43"},{url:"/images/flow/E.png",revision:"8a7017c24145729f33e8ddffab4bd82b"},{url:"/images/flow/O.png",revision:"80ed5f60e13c6991b4ea00b72e9ff4f5"},{url:"/images/flow/P.png",revision:"a2eb5359596abfbcad7e9ff0055586b0"},{url:"/images/logo.png",revision:"e9f21686244b27453083431472c8ecea"},{url:"/images/maskable_icon.png",revision:"d0dac095aee9efdbff692069bd9ba402"},{url:"/images/mobile/banner-01.png",revision:"99354adaa6b0457fa618906392c9062b"},{url:"/images/mobile/banner-02.png",revision:"ed43a67e53e2de67ad10fa15a736b1a4"},{url:"/images/mobile/banner-03.png",revision:"03e85f530a65e423a493eb25b7e848e6"},{url:"/images/mobile/banner-04.png",revision:"d9a3b4b4fc911a3c11c198b74984693d"},{url:"/images/order/confirmation.png",revision:"027eba35a66af8a82eba237ad9369921"},{url:"/images/send.svg",revision:"1e80b0261a1933a5776aff02744a3f10"},{url:"/manifest.json",revision:"1bf98e1c60e9b3f655b77ec5bf566d6e"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
