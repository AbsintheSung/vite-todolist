import{o as d,c as u,a as t,b as $,t as h,F as g,p as k,d as y,r as p,e as v,f as T,g as b,w,h as F,v as S,i as V,n as _,j as B,k as N,l as j}from"./index-BQY3o9Fx.js";import{_ as x,T as A}from"./TodoList-Title-DvEI0cF2.js";const f=n=>(k("data-v-ef418289"),n=n(),y(),n),L={key:0,class:"test"},K={key:1,class:"test2"},z=f(()=>t("button",{class:"edit-link"},[t("span",{class:"material-icons-outlined"},"drive_file_rename_outline")],-1)),E=f(()=>t("button",{class:"delete-link"},[t("span",{class:"material-icons-outlined delete-icon"},"clear")],-1)),M=f(()=>t("div",null,null,-1)),O={__name:"listItem",props:{sendData:{type:Object,default:()=>({})}},emits:{changeComplete:n=>{if(typeof n=="object")return!0}},setup(n,{emit:i}){const e=n,a=i;async function c(){e.sendData.completed_at===null?e.sendData.completed_at="2024-04-11T14:15:14.933+08:00":e.sendData.completed_at=null,a("changeComplete",e.sendData)}return(m,r)=>(d(),u(g,null,[t("li",null,[t("div",{onClick:c},[e.sendData.completed_at===null?(d(),u("div",L)):typeof e.sendData.completed_at=="string"?(d(),u("div",K)):$("",!0),t("p",null,h(e.sendData.content),1)]),z,E]),M],64))}},U=x(O,[["__scopeId","data-v-ef418289"]]),C=n=>(k("data-v-31c73114"),n=n(),y(),n),q={class:"home-container"},G={class:"input-box"},H=C(()=>t("span",{class:"material-icons-outlined"},"add",-1)),J=[H],P={class:"list-box"},Q={class:"filter-btnbox"},R={class:"todo-list"},W={class:"d-flex align-items-baseline px-3"},X=C(()=>t("button",{class:"ms-auto border-0 bg-white"},"清除已完成項目",-1)),Y={__name:"home",setup(n){const i=p(""),e=p({todos:[{id:"fac3ab3af26f6a90c8db94a024ecdd27",content:"繳電費水費瓦斯費",completed_at:null},{id:"091e37fffb47ea2bf43e3afe1ed68310",content:"整理電腦資料夾",completed_at:"2024-04-11T14:15:14.933+08:00"},{id:"ef6326e91350c71a49b7d4d843d9f9a8",content:"打電話叫媽媽匯款給我",completed_at:null},{id:"9d99c0ba8bfef971a3edca219be64a0f",content:"把冰箱發霉的檸檬拿去丟",completed_at:"2024-04-11T14:15:14.933+08:00"},{id:"f4f4ac13401bfc22719cbb34d295b060",content:"我要吃晚餐",completed_at:null},{id:"64d86a7ea504fd1423933b5f4ce3ef06",content:"我要買飲料",completed_at:"2024-04-11T14:15:14.933+08:00"},{id:"0756aa8d571d1f8f412f23cebeb43b45",content:"我要幹大事",completed_at:null}]}),a=p("all"),c=o=>{a.value=o};v(()=>{if(a.value==="all")return e.value.todos;if(a.value==="pending")return e.value.todos.filter(o=>{if(o.completed_at===null)return o});if(a.value==="finish")return e.value.todos.filter(o=>{if(typeof o.completed_at=="string")return o})});const m=v(()=>e.value.todos.filter(s=>{if(s.completed_at===null)return s}).length);async function r(){console.log(i.value)}function D(o){console.log(o)}return(o,s)=>{const I=T("router-link");return d(),u("div",q,[t("header",null,[b(A),b(I,{style:{color:"red"},to:"login"},{default:w(()=>[N("登出")]),_:1})]),t("div",G,[F(t("input",{type:"text","onUpdate:modelValue":s[0]||(s[0]=l=>i.value=l),onKeyup:V(r,["enter"])},null,544),[[S,i.value]]),t("button",{class:"addinput",onClick:r},J)]),t("div",P,[t("div",Q,[t("button",{class:_([{buttonActive:a.value==="all"}]),onClick:s[1]||(s[1]=l=>c("all"))},"全部",2),t("button",{class:_([{buttonActive:a.value==="pending"}]),onClick:s[2]||(s[2]=l=>c("pending"))},"待完成",2),t("button",{class:_([{buttonActive:a.value==="finish"}]),onClick:s[3]||(s[3]=l=>c("finish"))},"已完成",2)]),t("ul",R,[(d(!0),u(g,null,B(e.value.todos,l=>(d(),j(U,{key:l.id,sendData:l,onChangeComplete:D},null,8,["sendData"]))),128))]),t("div",W,[t("p",null,h(m.value)+"個待完成項目",1),X])])])}}},et=x(Y,[["__scopeId","data-v-31c73114"]]);export{et as default};