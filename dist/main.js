(()=>{"use strict";const e=document.querySelector("[data-current-year]"),t=(new Date).getFullYear();e.innerText=t.toString();const n={storageName:"localStorage",storageInstance:localStorage},o={storageName:"sessionStorage",storageInstance:sessionStorage},a=document.querySelector("[data-local]"),r=document.querySelector("[data-session]");function l({storageName:e,storageInstance:t}){const n=Object.assign({},t);"localStorage"===e?a.innerHTML="":r.innerHTML="";for(let t in n){const n=document.createElement("button");n.className="storage-item-button",n.innerText=t,"localStorage"===e&&(null==a||a.append(n)),"sessionStorage"===e&&(null==r||r.append(n))}}l(n),l(o),document.querySelector("[data-add-form]").addEventListener("submit",(function(e){var t,a;e.preventDefault();const r=e.target,s=new FormData(r),u=r.querySelector('input[name="key"]'),c=r.querySelector('input[name="value"]'),i=s.get("storage"),g=null===(t=s.get("key"))||void 0===t?void 0:t.toString(),d=null===(a=s.get("value"))||void 0===a?void 0:a.toString();if(null==i||""===i)return;if(""===g||null==g)return;if(""===d||null==d)return;const S="local"===(m=i)?localStorage:"session"===m?sessionStorage:void 0;var m;null!=S&&(S.setItem(g,d),function(e){"local"===e?l(n):"session"===e&&l(o)}(i),u.value="",c.value="")}))})();