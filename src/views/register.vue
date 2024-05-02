<script setup>
import { ref,watch } from 'vue';
import TodoListTitle from '../components/TodoList-Title.vue';
import TitleImage from '../components/TitleImage.vue';
import { registerAPI } from '../api/register';
import { useRoute ,useRouter} from 'vue-router' ;
import {  toastWaitMessage,updateToastMessage,updateToastMessage_Error} from '../js/toast'

//https://todolist-api.hexschool.io/users/

const router = useRouter();
const isDisabled = ref(false)

const  registerInput = ref({
    email:"",
    nickname:"",
    password:"",
    doublePassWord:""
})

const verifyRule = ref({
    email:{
        state:false,
        alert:'',
    },
    nickname:{
        state:false,
        alert:'',
    },
    password:{
        state:false,
        alert:'',
    },
    doublePassWord:{
        state:false,
        alert:'',
    }
})


async function registerAccount(){
    try {
        isDisabled.value = true
        toastWaitMessage('註冊中')
        const data = await registerAPI('https://todolist-api.hexschool.io/users/sign_up', 'POST', registerInput.value );
        // console.log('正確資訊', data);
        if(data.status){
            updateToastMessage('註冊成功')
            router.push('/')
        }
    } catch (error) {
        updateToastMessage_Error(error)
        // console.error('登入過程中發生錯誤', error);
    }finally{
        isDisabled.value = false
    }
}


//監聽使用者 輸入的資訊，來設定狀態
watch(registerInput.value,(newContent)=>{
    Object.keys(newContent).forEach((item)=>{
        if(newContent[item]===''){
            verifyRule.value[item].state = false
        }else{
            verifyRule.value[item].state = true
            verifyRule.value[item].alert = ''
        }
    })   

})

function verify(){
    Object.keys(verifyRule.value).forEach((item)=>{
        if( !verifyRule.value[item].state ){
            verifyRule.value[item].alert = '欄位不可以為空'
        }else{
            verifyRule.value[item].alert = ''
        }
    })   

    if(registerInput.value.doublePassWord !== registerInput.value.password){
        verifyRule.value['doublePassWord'].state = false;
        verifyRule.value['doublePassWord'].alert = '密碼與設定不相同';
    }

    //判斷 每個的.state狀態都為 true 回傳 true ，否則都為 false
    return Object.values(verifyRule.value).every((item)=> item.state )
}




</script>

<template>

    <div class="register-container  pt-5 pt-md-0 d-md-flex justify-content-md-around">
        
        <div class="pt-md-111">
            <TodoListTitle  :fontSize="32"  :checkWidth="40" :checkHeight="40"/>
            <TitleImage :width="386" :height="386"></TitleImage>

        </div>

        <div class="register-form-size fm-Noto-Sans-TC pt-md-81">
            <h3 class="fs-20 fw-bold text-center mt-3 mb-26  mt-md-0 mb-md-4">註冊帳號</h3>

            <form class="register-form d-flex flex-column justify-content-center align-items-start">
                <div class="d-flex flex-column w-100 mb-4">
                    <label for="email-input" class="register-label mb-1">Email</label>
                    <input id="email-input" class="register-input" type="text" placeholder="請輸入Email" v-model="registerInput.email">
                    <p :class="['noActive',{active: !verifyRule.email.state}]">{{verifyRule.email.alert}}</p>
                </div>

                <div class="d-flex flex-column w-100 mb-4">
                    <label for="nickname-input" class="register-label mb-1">您的暱稱</label>
                    <input id="nickname-input" class="register-input" type="text" placeholder="請輸入您的暱稱"  v-model="registerInput.nickname">
                    <p :class="['noActive',{active: !verifyRule.nickname.state}]">{{verifyRule.nickname.alert}}</p>
                </div>


                <div class="d-flex flex-column w-100 mb-4">
                    <label for="password-input" class="register-label mb-1">Password</label>
                    <input id="password-input" class="register-input" type="password" placeholder="請輸入密碼" v-model="registerInput.password">
                    <p :class="['noActive',{active: !verifyRule.password.state}]">{{verifyRule.password.alert}}</p>
                </div>

                <div class="d-flex flex-column w-100 mb-4">
                    <label for="doublePassWord" class="register-label mb-1">再次輸入密碼</label>
                    <input id="doublePassWord" class="register-input" type="password" placeholder="請再次輸入密碼" v-model="registerInput.doublePassWord">
                    <p :class="['noActive',{active: !verifyRule.doublePassWord.state}]">{{verifyRule.doublePassWord.alert}}</p>
                </div>


                <button class="register-btn align-self-center py-12 px-5 bg-dark text-white" :disabled="isDisabled" @click.prevent="verify()? registerAccount():null">註冊帳號</button>
                <router-link to="/" class="fw-bold text-dark align-self-center mt-4 text-decoration-none">登入</router-link>
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

.register-form{
    .register-input{
        border-radius: 4px;
        padding: 12px 16px;
        border: none;
    }
    .register-btn{
        border: none;
        border-radius: 10px;
    }
    .register-input:focus {
        outline: none;
    }
}
.register-label{
    font-size: 14px;
    font-weight: bold;
}

</style>