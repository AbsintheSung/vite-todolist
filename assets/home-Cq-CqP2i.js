import{r as y,o as d,c as f,w as A,v as F,a,b as M,t as S,p as P,d as B,u as Z,e as Q,f as T,g as X,h as p,n as j,F as Y,i as tt,j as et}from"./index-rGVPUKEC.js";import{_ as L,u as v,a as m,t as g,T as ot}from"./toast-CxEPKlYb.js";const st="/vite-todolist/assets/8911ab6dcbda98df56e26aa23c6643ac-CwWZoW3o.png";async function _(n,u,r,s=null){try{let o={method:u,headers:{"Content-Type":"application/json",Authorization:`${r}`},cache:"no-cache"};s&&(o.body=JSON.stringify(s));const c=await fetch(n,o);if(!c.ok){let h=await c.json();throw console.log("錯誤資訊",h),new Error(h.message)}return await c.json()}catch(o){throw o}}async function nt(n,u,r,s=null){try{let o={method:u,headers:{"Content-Type":"application/json",Authorization:`${r}`},cache:"no-cache"};s&&(o.body=JSON.stringify(s));const c=await fetch(n,o);if(!c.ok){let h=await c.json();throw console.log("登出錯誤資訊",h),new Error(h.message)}return await c.json()}catch(o){throw o}}const x=n=>(P("data-v-481f0ae4"),n=n(),B(),n),at={key:0,class:"edit-box"},it=x(()=>a("span",{class:"material-icons-outlined"},"add",-1)),lt=[it],ct={key:0,class:"is-nocheck"},rt={key:1,class:"is-check"},dt=x(()=>a("span",{class:"material-icons-outlined"},"drive_file_rename_outline",-1)),ut=[dt],ft=x(()=>a("span",{class:"material-icons-outlined"}," edit_off ",-1)),ht=[ft],pt=x(()=>a("span",{class:"material-icons-outlined delete-icon"},"clear",-1)),vt=[pt],_t={__name:"listItem",props:{sendData:{type:Object,default:()=>({})}},emits:{changeComplete:n=>{if(typeof n=="object")return!0},deleteItem:n=>{if(typeof n=="object")return!0},editItem:n=>{if(typeof n=="object")return!0},editOffItem:n=>{if(typeof n=="object")return!0},editHandle:(n,u)=>{if(typeof n=="object"&&typeof u=="string")return!0}},setup(n,{emit:u}){const r=y(""),s=n;r.value=s.sendData.content;const o=u;function c(){o("changeComplete",s.sendData)}function h(){o("deleteItem",s.sendData)}function i(){o("editItem",s.sendData)}function k(){o("editOffItem",s.sendData)}function b(){o("editHandle",s.sendData,r.value)}return(O,w)=>(d(),f("li",null,[s.sendData.edit?(d(),f("div",at,[A(a("input",{class:"edit-input",type:"text","onUpdate:modelValue":w[0]||(w[0]=E=>r.value=E),onKeyup:M(b,["enter"])},null,544),[[F,r.value]]),a("button",{class:"edit-addbtn",onClick:b},lt)])):(d(),f("div",{key:1,onClick:c},[s.sendData.status?(d(),f("div",rt)):(d(),f("div",ct)),a("p",null,S(s.sendData.content),1)])),s.sendData.edit?(d(),f("button",{key:3,class:"edit-off-link",onClick:k},ht)):(d(),f("button",{key:2,class:"edit-link",onClick:i},ut)),a("button",{class:"delete-link",onClick:h},vt)]))}},mt=L(_t,[["__scopeId","data-v-481f0ae4"]]);function I(n,u){let r=0;return function(){let s=Date.now();s-r>u&&(n.apply(this,arguments),r=s)}}const $=n=>(P("data-v-5410327c"),n=n(),B(),n),yt={class:"home-container"},kt={class:"d-none d-sm-block ms-auto me-3 fw-bold"},gt={class:"input-box"},bt=$(()=>a("span",{class:"material-icons-outlined"},"add",-1)),wt=[bt],Ct={key:0},Dt=$(()=>a("h3",{class:"text-center"},"目前尚無代辦事項",-1)),It=$(()=>a("img",{class:"img-nolist",src:st},null,-1)),xt=[Dt,It],$t={key:1,class:"list-box"},Et={class:"filter-btnbox"},Tt={class:"todo-list"},jt={class:"d-flex align-items-baseline px-3"},St=$(()=>a("button",{class:"ms-auto border-0 bg-white"},"清除已完成項目",-1)),Ot={__name:"home",setup(n){const u=Z(),r=y(""),s=document.cookie.replace(/(?:(?:^|.*;\s*)TokenCode\s*\=\s*([^;]*).*$)|^.*$/,"$1"),o=y([]),c=y("all"),h=y(""),i=y(!0);Q(async()=>{if(i){v("資料讀取中");try{const e=await _("https://todolist-api.hexschool.io/todos/","GET",s);i.value=!1,v("讀取成功"),e.data.forEach(t=>{t.edit=!1,o.value.push(t)})}catch(e){m(e)}finally{i.value=!0}}});const k=e=>{c.value=e},b=T(()=>{if(c.value==="all")return o.value;if(c.value==="pending")return o.value.filter(e=>{if(!e.status)return e});if(c.value==="finish")return o.value.filter(e=>{if(e.status)return e})}),O=T(()=>o.value.filter(t=>{if(!t.status)return t}).length),w=T(()=>o.value.length===0);function E(e){const t=o.value.findIndex(l=>l.id===e.id);o.value.forEach(l=>l.edit=!1),o.value[t].edit=!o.value[t].edit}function N(e){const t=o.value.findIndex(l=>l.id===e.id);o.value[t].edit=!1}async function H(){try{const e=await _("https://todolist-api.hexschool.io/users/checkout","GET",s);e.status&&(h.value=e.nickname)}catch{}}H();async function C(){if(i)try{const e=await _("https://todolist-api.hexschool.io/todos/","GET",s);i.value=!1,o.value=[],e.data.forEach(t=>{t.edit=!1,o.value.push(t)})}catch{}finally{i.value=!0}}async function U(){const e={content:r.value};if(i)try{g("新增中");const t=await _("https://todolist-api.hexschool.io/todos/","POST",s,e);i.value=!1,t.status&&(v("新增成功"),C(),r.value="")}catch(t){m(t)}finally{i.value=!0}}async function V(e){if(i)try{g("修改中");const t=e.id;i.value=!1,(await _(`https://todolist-api.hexschool.io/todos/${t}/toggle`,"PATCH",s)).status&&(v("修改完成"),C())}catch(t){m(t)}finally{i.value=!0}}async function z(e){if(i)try{const t=e.id;i.value=!1,g("刪除中"),(await _(`https://todolist-api.hexschool.io/todos/${t}`,"DELETE",s)).status&&(v("刪除完成"),C())}catch(t){m(t)}finally{i.value=!0}}async function G(e,t){if(i)try{const l=e.id,q={content:t};i.value=!1,g("修改中"),(await _(`https://todolist-api.hexschool.io/todos/${l}`,"PUT",s,q)).status&&(v("內容修改完成"),C())}catch(l){m(l)}finally{i.value=!0}}async function J(){if(i)try{g("登出中"),i.value=!1,(await nt("https://todolist-api.hexschool.io/users/sign_out","POST",s)).status&&(document.cookie=`TokenCode=${s}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,v("登出成功"),u.push("/"))}catch(e){m(e)}finally{i.value=!0}}const D=I(U,1e3),K=I(V,1e3),W=I(z,1e3),R=I(E,1e3);return(e,t)=>(d(),f("div",yt,[a("header",null,[X(ot),a("p",kt,S(h.value)+" 的代辦",1),a("a",{class:"login-out",onClick:J},"登出")]),a("div",gt,[A(a("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=l=>r.value=l),onKeyup:t[1]||(t[1]=M((...l)=>p(D)&&p(D)(...l),["enter"]))},null,544),[[F,r.value]]),a("button",{class:"addinput",onClick:t[2]||(t[2]=(...l)=>p(D)&&p(D)(...l))},wt)]),w.value?(d(),f("div",Ct,xt)):(d(),f("div",$t,[a("div",Et,[a("button",{class:j([{buttonActive:c.value==="all"}]),onClick:t[3]||(t[3]=l=>k("all"))},"全部",2),a("button",{class:j([{buttonActive:c.value==="pending"}]),onClick:t[4]||(t[4]=l=>k("pending"))},"待完成",2),a("button",{class:j([{buttonActive:c.value==="finish"}]),onClick:t[5]||(t[5]=l=>k("finish"))},"已完成",2)]),a("ul",Tt,[(d(!0),f(Y,null,tt(b.value,l=>(d(),et(mt,{key:l.id,sendData:l,onChangeComplete:p(K),onDeleteItem:p(W),onEditItem:p(R),onEditOffItem:N,onEditHandle:G},null,8,["sendData","onChangeComplete","onDeleteItem","onEditItem"]))),128))]),a("div",jt,[a("p",null,S(O.value)+"個待完成項目",1),St])]))]))}},Pt=L(Ot,[["__scopeId","data-v-5410327c"]]);export{Pt as default};
