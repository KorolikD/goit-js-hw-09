var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){o[e]=n},e.parcelRequired7c6=t);var i=t("iQIUW");i.Notify.init({useIcon:!1});const r=document.querySelector(".form");function l(e,n){return new Promise(((o,t)=>{const i=Math.random()>.3;setTimeout((()=>{i&&o({position:e,delay:n}),t({position:e,delay:n})}),n)}))}function u({position:e,delay:n}){i.Notify.success(`✅ Fulfilled promise ${e} in ${n}ms`)}function s({position:e,delay:n}){i.Notify.failure(`❌ Rejected promise ${e} in ${n}ms`)}r.addEventListener("submit",(function(e){e.preventDefault();let n=Number(r.delay.value);const o=Number(r.step.value),t=Number(r.amount.value);for(let e=1;e<=t;e++)l(e,n).then(u).catch(s),n+=o}));
//# sourceMappingURL=03-promises.5c999af3.js.map
