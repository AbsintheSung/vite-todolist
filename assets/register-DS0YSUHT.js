import{u as g,r as v,l as w,m as x,o as k,c as y,a as s,h as b,w as d,v as c,n as u,t as p,q as P,s as W,x as T,p as j,d as S}from"./index-Cv-0C1nB.js";import{_ as E,T as I,t as V,u as A,a as M}from"./toast-BCnJC-rN.js";import{T as C}from"./TitleImage-2vhTld8k.js";async function N(r,m,i=null){try{let t={method:m,headers:{"Content-Type":"application/json"},cache:"no-cache"};i&&(t.body=JSON.stringify(i));const e=await fetch(r,t);if(!e.ok){let f=await e.json();throw new Error(f.message)}return await e.json()}catch(t){throw t}}const n=r=>(j("data-v-1c4a70bb"),r=r(),S(),r),O={class:"register-container pt-5 pt-md-0 d-md-flex justify-content-md-around"},U={class:"pt-md-111"},z={class:"register-form-size fm-Noto-Sans-TC pt-md-81"},B=n(()=>s("h3",{class:"fs-20 fw-bold text-center mt-3 mb-26 mt-md-0 mb-md-4"},"註冊帳號",-1)),D={class:"register-form d-flex flex-column justify-content-center align-items-start"},R={class:"d-flex flex-column w-100 mb-4"},q=n(()=>s("label",{for:"email-input",class:"register-label mb-1"},"Email",-1)),H={class:"d-flex flex-column w-100 mb-4"},J=n(()=>s("label",{for:"nickname-input",class:"register-label mb-1"},"您的暱稱",-1)),L={class:"d-flex flex-column w-100 mb-4"},$=n(()=>s("label",{for:"password-input",class:"register-label mb-1"},"Password",-1)),F={class:"d-flex flex-column w-100 mb-4"},G=n(()=>s("label",{for:"doublePassWord",class:"register-label mb-1"},"再次輸入密碼",-1)),K=["disabled"],Q={__name:"register",setup(r){const m=g(),i=v(!1),t=v({email:"",nickname:"",password:"",doublePassWord:""}),e=v({email:{state:!1,alert:""},nickname:{state:!1,alert:""},password:{state:!1,alert:""},doublePassWord:{state:!1,alert:""}});async function f(){try{i.value=!0,V("註冊中"),(await N("https://todolist-api.hexschool.io/users/sign_up","POST",t.value)).status&&(A("註冊成功"),m.push("/"))}catch(l){M(l)}finally{i.value=!1}}w(t.value,l=>{Object.keys(l).forEach(a=>{l[a]===""?e.value[a].state=!1:(e.value[a].state=!0,e.value[a].alert="")})});function h(){return Object.keys(e.value).forEach(l=>{e.value[l].state?e.value[l].alert="":e.value[l].alert="欄位不可以為空"}),t.value.doublePassWord!==t.value.password&&(e.value.doublePassWord.state=!1,e.value.doublePassWord.alert="密碼與設定不相同"),Object.values(e.value).every(l=>l.state)}return(l,a)=>{const _=x("router-link");return k(),y("div",O,[s("div",U,[b(I,{fontSize:32,checkWidth:40,checkHeight:40}),b(C,{width:386,height:386})]),s("div",z,[B,s("form",D,[s("div",R,[q,d(s("input",{id:"email-input",class:"register-input",type:"text",placeholder:"請輸入Email","onUpdate:modelValue":a[0]||(a[0]=o=>t.value.email=o)},null,512),[[c,t.value.email]]),s("p",{class:u(["noActive",{active:!e.value.email.state}])},p(e.value.email.alert),3)]),s("div",H,[J,d(s("input",{id:"nickname-input",class:"register-input",type:"text",placeholder:"請輸入您的暱稱","onUpdate:modelValue":a[1]||(a[1]=o=>t.value.nickname=o)},null,512),[[c,t.value.nickname]]),s("p",{class:u(["noActive",{active:!e.value.nickname.state}])},p(e.value.nickname.alert),3)]),s("div",L,[$,d(s("input",{id:"password-input",class:"register-input",type:"password",placeholder:"請輸入密碼","onUpdate:modelValue":a[2]||(a[2]=o=>t.value.password=o)},null,512),[[c,t.value.password]]),s("p",{class:u(["noActive",{active:!e.value.password.state}])},p(e.value.password.alert),3)]),s("div",F,[G,d(s("input",{id:"doublePassWord",class:"register-input",type:"password",placeholder:"請再次輸入密碼","onUpdate:modelValue":a[3]||(a[3]=o=>t.value.doublePassWord=o)},null,512),[[c,t.value.doublePassWord]]),s("p",{class:u(["noActive",{active:!e.value.doublePassWord.state}])},p(e.value.doublePassWord.alert),3)]),s("button",{class:"register-btn align-self-center py-12 px-5 bg-dark text-white",disabled:i.value,onClick:a[4]||(a[4]=P(o=>h()?f():null,["prevent"]))},"註冊帳號",8,K),b(_,{to:"/",class:"fw-bold text-dark align-self-center mt-4 text-decoration-none"},{default:W(()=>[T("登入")]),_:1})])])])}}},ee=E(Q,[["__scopeId","data-v-1c4a70bb"]]);export{ee as default};