<script setup>
import { computed, ref ,watch} from 'vue';
import TodoListTitle from '../components/TodoList-Title.vue';
import TitleImage from '../components/TitleImage.vue'
import { useRoute ,useRouter} from 'vue-router' ;
import {  loginAPI  } from "../api/login"

import {  toastWaitMessage,updateToastMessage,updateToastMessage_Error} from '../js/toast'


const router = useRouter();
const isDisabled = ref(false)
const loginInput = ref({
    email:'',
    password:''
})
const verifyRule = ref({
    email:{
        state:false,
        alert:'',
    },
    password:{
        state:false,
        alert:'',
    }
})

//監聽使用者 輸入的資訊，來設定狀態
watch(loginInput.value,(newContent)=>{
    Object.keys(newContent).forEach((item)=>{
        if(newContent[item]===''){
            verifyRule.value[item].state = false
        }else{
            verifyRule.value[item].state = true
            verifyRule.value[item].alert = ''
        }
    })   

})




async function login(){
    try {
        toastWaitMessage('登入中')
        isDisabled.value = true
        const data = await loginAPI('https://todolist-api.hexschool.io/users/sign_in', 'POST', loginInput.value);
        // console.log('正確資訊', data);
        // console.log(data.token);

        if(data.status){
            updateToastMessage('登入成功')
            document.cookie=`TokenCode=${data.token}`
            router.push('/home')
        }
    } catch (error) {
        updateToastMessage_Error(error)
    }finally{
        isDisabled.value = false
    }
}

//簡易使用者輸入 防擋機制
function verify(){
    Object.keys(verifyRule.value).forEach((item)=>{
        if( !verifyRule.value[item].state ){
            verifyRule.value[item].alert = '欄位不可以為空'
        }else{
            verifyRule.value[item].alert = ''
        }
    })   
    //判斷 每個的.state狀態都為 true 回傳 true ，否則都為 false
    return Object.values(verifyRule.value).every((item)=> item.state )
}









</script>

<template>

    <div class="login-container  pt-5 d-md-flex justify-content-md-around">
        <div>

            <TodoListTitle  :fontSize="32"  :checkWidth="40" :checkHeight="40"/>
            <TitleImage :width="386" :height="386"></TitleImage>
        </div>
       
        <div class="login-form-size fm-Noto-Sans-TC">
            <h2 class="fs-20 fw-bold text-center mt-3 mb-32 mt-md-60">最實用的線上代辦事項服務</h2>

            <form class="login-form d-flex flex-column justify-content-center align-items-start">

                <div class="d-flex flex-column w-100">
                    <label class="mb-1 login-label" for="login-email">Email</label>
                    <input id="login-email" class="login-input" type="text" placeholder="請輸入Email" v-model="loginInput.email">
                    <p :class="['noActive',{active: !verifyRule.email.state}]">{{verifyRule.email.alert}}</p>
                </div>

                <div class="d-flex flex-column w-100 my-4">
                    <label class="mb-1 login-label" for="login-password">Password</label>
                    <input id="login-password" class="login-input" type="password" placeholder="請輸入密碼" v-model="loginInput.password">
                    <p :class="['noActive',{active: !verifyRule.password.state}]">{{verifyRule.password.alert}}</p>
                </div>


                <button class="login-btn align-self-center py-12 px-5 bg-dark text-white" :disabled="isDisabled" @click.prevent="verify()? login() : null" >登入</button>
                <router-link to="register" class="fw-bold text-dark align-self-center mt-4 text-decoration-none">註冊帳號</router-link>
            </form>

        </div>
       
    </div>
    

</template>

<style lang="scss" scoped>
.noActive{
    display: none;
}
.active{
    margin: 0px;
    display: block;
    color:red;
}

.login-form{
    .login-input{
        border-radius: 4px;
        padding: 12px 16px;
        border: none;
    }
    .login-btn{
        border: none;
        border-radius: 10px;
    }
    .login-input:focus {
        outline: none;
    }
}
.login-label{
    font-size: 14px;
    font-weight: bold;
}

</style>