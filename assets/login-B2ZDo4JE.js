import{u as _,r as c,f as g,o as w,c as x,a as t,g as i,i as d,v as u,n as p,t as f,m as b,h as y,k,p as S,b as T}from"./index-DXHxGI70.js";import{_ as A,T as j}from"./TodoList-Title-DVYSxx5x.js";import{T as N}from"./TitleImage-BZjhwf7G.js";const r=l=>(S("data-v-44eaa82d"),l=l(),T(),l),C={class:"login-container pt-5 d-md-flex justify-content-md-around"},E={class:"login-form-size fm-Noto-Sans-TC"},I=r(()=>t("h2",{class:"fs-20 fw-bold text-center mt-3 mb-32 mt-md-60"},"最實用的線上代辦事項服務",-1)),M={class:"d-flex flex-column justify-content-center align-items-start"},V={class:"d-flex flex-column w-100"},z=r(()=>t("label",{class:"mb-1"},"Email",-1)),D={class:"d-flex flex-column w-100 my-4"},O=r(()=>t("label",{class:"mb-1"},"Password",-1)),B=["disabled"],P={__name:"login",setup(l){_();const m=c(!1),e=c({email:{content:"",alert:"",isAlert:!1,state:!1},password:{content:"",alert:"",isAlert:!1,state:!1}});async function v(){try{let s={email:e.value.email.content,password:e.value.password.content},a=await fetch("https://todolist-api.hexschool.io/users/sign_in",{body:JSON.stringify(s),cache:"no-cache",headers:{"user-agent":"Mozilla/4.0 MDN Example","content-type":"application/json"},method:"POST"});if(!a.ok){const o=await a.json();console.log("錯誤資訊",o)}let n=await a.json();console.log("正確資訊",n),console.log(n.token)}catch{}finally{}}function h(){return Object.keys(e.value).forEach(function(s){e.value[s].content===""?(e.value[s].isAlert=!0,e.value[s].alert="欄位不可以為空"):(e.value[s].state=!0,e.value[s].isAlert=!1,e.value[s].alert="")}),Object.values(e.value).every(s=>s.state)}return(s,a)=>{const n=g("router-link");return w(),x("div",C,[t("div",null,[i(j,{fontSize:32,checkWidth:40,checkHeight:40}),i(N,{width:386,height:386})]),t("div",E,[I,t("form",M,[t("div",V,[z,d(t("input",{type:"text",placeholder:"請輸入Email","onUpdate:modelValue":a[0]||(a[0]=o=>e.value.email.content=o)},null,512),[[u,e.value.email.content]]),t("p",{class:p(["noActive",{active:e.value.email.isAlert}])},f(e.value.email.alert),3)]),t("div",D,[O,d(t("input",{type:"password",placeholder:"請輸入密碼","onUpdate:modelValue":a[1]||(a[1]=o=>e.value.password.content=o)},null,512),[[u,e.value.password.content]]),t("p",{class:p(["noActive",{active:e.value.password.isAlert}])},f(e.value.password.alert),3)]),t("button",{class:"align-self-center py-12 px-5 bg-dark text-white",disabled:m.value,onClick:a[2]||(a[2]=b(o=>h()?v():null,["prevent"]))},"登入",8,B),i(n,{to:"register",class:"fw-bold text-dark align-self-center mt-4 text-decoration-none"},{default:y(()=>[k("註冊帳號")]),_:1})])])])}}},L=A(P,[["__scopeId","data-v-44eaa82d"]]);export{L as default};
