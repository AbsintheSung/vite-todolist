<script setup>
import { ref } from 'vue';
import TodoListTitle from '../components/TodoList-Title.vue';
import TitleImage from '../components/TitleImage.vue';
//https://todolist-api.hexschool.io/users/
const userInput = ref({
    email:"",
    nickname:"",
    password:"",
})
async function tesregisterAccountt(){
    let user={
        "email":userInput.value.email,
        "nickname":userInput.value.nickname,
        "password":userInput.value.password
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
                <div class="d-flex flex-column w-100">
                    <label>Email</label>
                    <input type="text" placeholder="請輸入Email" v-model="userInput.email">
                    <p>欄位不可為空</p>
                </div>

                <div class="d-flex flex-column w-100">
                    <label>您的暱稱</label>
                    <input type="text" placeholder="請輸入您的暱稱"  v-model="userInput.nickname">
                    <p>欄位不可為空</p>
                </div>


                <div class="d-flex flex-column w-100">
                    <label>Password</label>
                    <input type="password" placeholder="請輸入密碼" v-model="userInput.password">
                    <p>欄位不可為空</p>
                </div>

                <div class="d-flex flex-column w-100">
                    <label>再次輸入密碼</label>
                    <input type="password" placeholder="請再次輸入密碼">
                    <p>欄位不可為空</p>
                </div>


                <button class="align-self-center py-12 px-5 bg-dark text-white" @click.prevent="tesregisterAccountt">註冊帳號</button>
                <router-link to="login" class="fw-bold text-dark align-self-center mt-4 text-decoration-none">登入</router-link>
            </form>

        </div>

    </div>
    
</template>

<style lang="scss" scoped>

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