import{r as m,o as l,c as u,a,w as x,t as $,p as D,b as E,u as B,d as L,e as w,f as H,g as M,v as N,n as I,F as z,h as J,i as K}from"./index-cWwjqs2d.js";import{_ as T,T as U}from"./TodoList-Title-DT4f7pLn.js";const V="/vite-todolist/assets/8911ab6dcbda98df56e26aa23c6643ac-CwWZoW3o.png";async function f(n,h,r,s=null){try{let o={method:h,headers:{"Content-Type":"application/json",Authorization:`${r}`},cache:"no-cache"};s&&(o.body=JSON.stringify(s));const c=await fetch(n,o);if(!c.ok){let d=await c.json();throw console.log("錯誤資訊",d),new Error(d.message)}return await c.json()}catch(o){throw o}}async function G(n,h,r,s=null){try{let o={method:h,headers:{"Content-Type":"application/json",Authorization:`${r}`},cache:"no-cache"};s&&(o.body=JSON.stringify(s));const c=await fetch(n,o);if(!c.ok){let d=await c.json();throw console.log("登出錯誤資訊",d),new Error(d.message)}return await c.json()}catch(o){throw o}}const y=n=>(D("data-v-8f1675d9"),n=n(),E(),n),W={key:0,class:"edit-box"},R=["value"],Z=y(()=>a("span",{class:"material-icons-outlined"},"add",-1)),q=[Z],Q={key:0,class:"is-nocheck"},X={key:1,class:"is-check"},Y=y(()=>a("span",{class:"material-icons-outlined"},"drive_file_rename_outline",-1)),tt=[Y],et=y(()=>a("span",{class:"material-icons-outlined"}," edit_off ",-1)),ot=[et],st=y(()=>a("span",{class:"material-icons-outlined delete-icon"},"clear",-1)),nt=[st],at={__name:"listItem",props:{sendData:{type:Object,default:()=>({})}},emits:{changeComplete:n=>{if(typeof n=="object")return!0},deleteItem:n=>{if(typeof n=="object")return!0},editItem:n=>{if(typeof n=="object")return!0},editOffItem:n=>{if(typeof n=="object")return!0},editHandle:(n,h)=>{if(typeof n=="object"&&typeof h=="string")return!0}},setup(n,{emit:h}){const r=m(""),s=n,o=h;function c(){o("changeComplete",s.sendData)}function d(){o("deleteItem",s.sendData)}function g(){o("editItem",s.sendData)}function b(){o("editOffItem",s.sendData)}function v(){o("editHandle",s.sendData,r.value)}function p(_){r.value=_.target.value}return(_,C)=>(l(),u("li",null,[s.sendData.edit?(l(),u("div",W,[a("input",{class:"edit-input",type:"text",value:s.sendData.content,onInput:p,onKeyup:x(v,["enter"])},null,40,R),a("button",{class:"edit-addbtn",onClick:v},q)])):(l(),u("div",{key:1,onClick:c},[s.sendData.status?(l(),u("div",X)):(l(),u("div",Q)),a("p",null,$(s.sendData.content),1)])),s.sendData.edit?(l(),u("button",{key:3,class:"edit-off-link",onClick:b},ot)):(l(),u("button",{key:2,class:"edit-link",onClick:g},tt)),a("button",{class:"delete-link",onClick:d},nt)]))}},it=T(at,[["__scopeId","data-v-8f1675d9"]]),k=n=>(D("data-v-927dae08"),n=n(),E(),n),ct={class:"home-container"},lt={class:"input-box"},rt=k(()=>a("span",{class:"material-icons-outlined"},"add",-1)),dt=[rt],ut={key:0},ht=k(()=>a("h3",{class:"text-center"},"目前尚無代辦事項",-1)),pt=k(()=>a("img",{class:"img-nolist",src:V},null,-1)),ft=[ht,pt],_t={key:1,class:"list-box"},vt={class:"filter-btnbox"},mt={class:"todo-list"},yt={class:"d-flex align-items-baseline px-3"},kt=k(()=>a("button",{class:"ms-auto border-0 bg-white"},"清除已完成項目",-1)),gt={__name:"home",setup(n){const h=B(),r=m("");let s=document.cookie.replace(/(?:(?:^|.*;\s*)TokenCode\s*\=\s*([^;]*).*$)|^.*$/,"$1");const o=m([]),c=m("all");L(async()=>{try{(await f("https://todolist-api.hexschool.io/todos/","GET",s)).data.forEach(t=>{t.edit=!1,o.value.push(t)})}catch(e){console.error(e)}});const d=e=>{c.value=e},g=w(()=>{if(c.value==="all")return o.value;if(c.value==="pending")return o.value.filter(e=>{if(!e.status)return e});if(c.value==="finish")return o.value.filter(e=>{if(e.status)return e})}),b=w(()=>o.value.filter(t=>{if(!t.status)return t}).length),v=w(()=>o.value.length===0);async function p(){try{const e=await f("https://todolist-api.hexschool.io/todos/","GET",s);o.value=[],e.data.forEach(t=>{t.edit=!1,o.value.push(t)})}catch(e){console.error(e)}}async function _(){const e={content:r.value};try{(await f("https://todolist-api.hexschool.io/todos/","POST",s,e)).status&&(p(),r.value="")}catch(t){console.error(t)}}async function C(e){try{const t=e.id;(await f(`https://todolist-api.hexschool.io/todos/${t}/toggle`,"PATCH",s)).status&&p()}catch(t){console.error("更新狀態失敗",t)}}async function j(e){try{const t=e.id;(await f(`https://todolist-api.hexschool.io/todos/${t}`,"DELETE",s)).status&&p()}catch(t){console.error("刪除失敗",t)}}async function S(e,t){try{const i=e.id,P={content:t};(await f(`https://todolist-api.hexschool.io/todos/${i}`,"PUT",s,P)).status&&p()}catch(i){console.error("修改失敗",i)}}async function O(){try{(await G("https://todolist-api.hexschool.io/users/sign_out","POST",s)).status&&(document.cookie=`TokenCode=${s}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,h.push("/"))}catch(e){console.error(e)}}function A(e){const t=o.value.findIndex(i=>i.id===e.id);o.value.forEach(i=>i.edit=!1),o.value[t].edit=!o.value[t].edit}function F(e){const t=o.value.findIndex(i=>i.id===e.id);o.value[t].edit=!1}return(e,t)=>(l(),u("div",ct,[a("header",null,[H(U),a("a",{class:"login-out",onClick:O},"登出")]),a("div",lt,[M(a("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=i=>r.value=i),onKeyup:x(_,["enter"])},null,544),[[N,r.value]]),a("button",{class:"addinput",onClick:_},dt)]),v.value?(l(),u("div",ut,ft)):(l(),u("div",_t,[a("div",vt,[a("button",{class:I([{buttonActive:c.value==="all"}]),onClick:t[1]||(t[1]=i=>d("all"))},"全部",2),a("button",{class:I([{buttonActive:c.value==="pending"}]),onClick:t[2]||(t[2]=i=>d("pending"))},"待完成",2),a("button",{class:I([{buttonActive:c.value==="finish"}]),onClick:t[3]||(t[3]=i=>d("finish"))},"已完成",2)]),a("ul",mt,[(l(!0),u(z,null,J(g.value,i=>(l(),K(it,{key:i.id,sendData:i,onChangeComplete:C,onDeleteItem:j,onEditItem:A,onEditOffItem:F,onEditHandle:S},null,8,["sendData"]))),128))]),a("div",yt,[a("p",null,$(b.value)+"個待完成項目",1),kt])]))]))}},Ct=T(gt,[["__scopeId","data-v-927dae08"]]);export{Ct as default};
