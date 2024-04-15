<script setup>
import { ref } from 'vue';
import TodoListTitle from '../components/TodoList-Title.vue';
import TitleImage from '../components/TitleImage.vue';
import AlertContent from '../components/AlertContent.vue';
//https://todolist-api.hexschool.io/users/
const inputState = ref({
    email:{
        content:'',
        alert:'',
        isAlert:false,
        state:false,
    },
    nickname:{
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
    },
    doublePassWord:{
        content:'',
        alert:'',
        isAlert:false,
        state:false,
    }
})
const userInput = ref({
    email:"",
    nickname:"",
    password:"",
    doublePassWord:'',
    isSend:false,
})

async function registerAccount(){
    let user={
        "email":inputState.value.email.content,
        "nickname":inputState.value.nickname.content,
        "password":inputState.value.password.content
    }
    try {
        let data = await fetch('https://todolist-api.hexschool.io/users/sign_up',{
            body:JSON.stringify(user),
            cache: "no-cache",
            headers: {
                "user-agent": "Mozilla/4.0 MDN Example",
                "content-type": "application/json",
            },
            method: "POST",
           
        })
        if( !data.ok ){
            const errorData = await data.json();
            console.log('錯誤資訊',errorData)
            // throw new Error(JSON.stringify(errorData))
        }
        const dataJson = await data.json(); 
        console.log('正確資訊',dataJson)

    } catch (error) {

    }
   
}


function verify(){
    // console.log(inputState.value)
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
    if(inputState.value.doublePassWord.content != inputState.value.password.content && inputState.value.password.content !=""){
        inputState.value.doublePassWord.isAlert = true
        inputState.value.doublePassWord.state = false
        inputState.value.doublePassWord.alert = '密碼與設定不相同'
    }

    //判斷 每個的.state狀態都為 true 回傳 true ，否則都為 false
    return Object.values(inputState.value).every((item)=> item.state)

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

            <form class="d-flex flex-column justify-content-center align-items-start">
                <div class="d-flex flex-column w-100 mb-4">
                    <label class="mb-1">Email</label>
                    <input type="text" placeholder="請輸入Email" v-model="inputState.email.content">
                    <p :class="['noActive',{active:inputState.email.isAlert}]">{{inputState.email.alert}}</p>
                </div>

                <div class="d-flex flex-column w-100 mb-4">
                    <label class="mb-1">您的暱稱</label>
                    <input type="text" placeholder="請輸入您的暱稱"  v-model="inputState.nickname.content">
                    <p :class="['noActive',{active:inputState.nickname.isAlert}]">{{inputState.nickname.alert}}</p>
                </div>


                <div class="d-flex flex-column w-100 mb-4">
                    <label class="mb-1">Password</label>
                    <input type="password" placeholder="請輸入密碼" v-model="inputState.password.content">
                    <p :class="['noActive',{active:inputState.password.isAlert}]">{{inputState.password.alert}}</p>
                </div>

                <div class="d-flex flex-column w-100 mb-4">
                    <label class="mb-1">再次輸入密碼</label>
                    <input type="password" placeholder="請再次輸入密碼" v-model="inputState.doublePassWord.content">
                    <p :class="['noActive',{active:inputState.doublePassWord.isAlert}]">{{inputState.doublePassWord.alert}}</p>
                </div>


                <button class="align-self-center py-12 px-5 bg-dark text-white" @click.prevent="verify()? registerAccount():null">註冊帳號</button>
                <router-link to="login" class="fw-bold text-dark align-self-center mt-4 text-decoration-none">登入</router-link>
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