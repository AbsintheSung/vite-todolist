<script setup>
import { computed, ref } from 'vue';
import TodoListTitle from '../components/TodoList-Title.vue';
import TitleImage from '../components/TitleImage.vue'
import { useRoute ,useRouter} from 'vue-router' ;
import {  loginAPI  } from "../api/login"

import {  toastWaitMessage,updateToastMessage,updateToastMessage_Error} from '../js/toast'

// import { toast } from 'vue3-toastify';
// import 'vue3-toastify/dist/index.css';



const router = useRouter();
const isDisabled = ref(false)
// const toastId = ref('');
const inputState = ref({
    email:{
        content:'',
        alert:'',
        isAlert:false,
        state:false,
    },
    password:{
        content:'',
        alert:'',
        isAlert:false,
        state:false,
    }
})

async function login(){
    let user = {
        "email":inputState.value.email.content ,
        "password":inputState.value.password.content
    }
    try {
        toastWaitMessage('登入中')
        isDisabled.value = true
        const data = await loginAPI('https://todolist-api.hexschool.io/users/sign_in', 'POST', user);
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
    Object.keys(inputState.value).forEach(function(item){
        if(inputState.value[item].content === ''){
            inputState.value[item].isAlert = true;
            inputState.value[item].alert = '欄位不可以為空';
        }else{
            inputState.value[item].state = true;
            inputState.value[item].isAlert = false;
            inputState.value[item].alert = '';
        }
    })   
    //判斷 每個的.state狀態都為 true 回傳 true ，否則都為 false
    return Object.values(inputState.value).every((item)=> item.state)
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

            <form class="d-flex flex-column justify-content-center align-items-start">

                <div class="d-flex flex-column w-100">
                    <label class="mb-1">Email</label>
                    <input type="text" placeholder="請輸入Email" v-model="inputState.email.content">
                    <p :class="['noActive',{active:inputState.email.isAlert}]">{{inputState.email.alert}}</p>
                </div>

                <div class="d-flex flex-column w-100 my-4">
                    <label class="mb-1">Password</label>
                    <input type="password" placeholder="請輸入密碼" v-model="inputState.password.content">
                    <p :class="['noActive',{active:inputState.password.isAlert}]">{{inputState.password.alert}}</p>
                </div>


                <button class="align-self-center py-12 px-5 bg-dark text-white" :disabled="isDisabled" @click.prevent="verify()? login() : null" >登入</button>
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

form{
    input{
        border-radius: 4px;
        padding: 12px 16px;
        border: none;
    }
    button{
        border: none;
        border-radius: 10px;
    }
    input:focus {
        outline: none;
    }
}
label{
    font-size: 14px;
    font-weight: bold;
}

</style>