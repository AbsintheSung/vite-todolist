<script setup>
import { ref } from 'vue';
import TodoListTitle from '../components/TodoList-Title.vue';
import TitleImage from '../components/TitleImage.vue'
import { useRoute } from 'vue-router';
const currentRoute = useRoute();

const userInput = ref({
    "email": "",
    "password": ""
})
async function login(){
    try {
        let user = {
            "email":userInput.value.email ,
            "password":userInput.value.password
        }
        let response = await fetch('https://todolist-api.hexschool.io/users/sign_in',{
            body:JSON.stringify(user),
            cache: "no-cache",
            headers: {
                "user-agent": "Mozilla/4.0 MDN Example",
                "content-type": "application/json",
            },
            method: "POST",
        })
        if(!response.ok){
            const errorMessage = await response.json();
            console.log('錯誤資訊',errorMessage)
        }
        let data = await response.json()
        console.log('正確資訊',data)
    } catch (error) {
        
    }
   
}

</script>

<template>

    <div class="login-container  pt-5 d-md-flex justify-content-md-around">
        <div>
            <!-- <h1 class="tolist-title fs-32 fw-bold text-center fm-Baloo-Thambi"><p class="title-check"></p>ONLINE TODO LIST</h1> -->
            <!-- <div class=" d-none d-md-block">
                <img  src="../assets/img/ff8dca85661a71240c169adaabe22733.png">
            </div> -->

            <TodoListTitle  :fontSize="32"  :checkWidth="40" :checkHeight="40"/>
            <TitleImage :width="386" :height="386"></TitleImage>
        </div>
       
        <div class="login-form-size fm-Noto-Sans-TC">
            <h2 class="fs-20 fw-bold text-center mt-3 mb-32 mt-md-60">最實用的線上代辦事項服務</h2>

            <form class="d-flex flex-column justify-content-center align-items-start">
                <div class="d-flex flex-column w-100">
                    <label>Email</label>
                    <input type="text" placeholder="請輸入Email" v-model="userInput.email">
                    <p>欄位不可為空</p>
                </div>

                <div class="d-flex flex-column w-100">
                    <label>Password</label>
                    <input type="password" placeholder="請輸入密碼" v-model="userInput.password">
                    <p>欄位不可為空</p>
                </div>


                <button class="align-self-center py-12 px-5 bg-dark text-white" @click.prevent="login">登入</button>
                <router-link to="register" class="fw-bold text-dark align-self-center mt-4 text-decoration-none">註冊帳號</router-link>
            </form>

        </div>
       
    </div>
    

</template>

<style lang="scss" scoped>
// .tolist-title{
//     display: flex;
//     justify-content: center;
// }
// .title-check{
//     position: relative;
//     margin-right: 4px;
//     width:40px;
//     height: 40px;
//     border: 2px solid black;
//     transform: rotate(-9.39deg);
// }
// .title-check::before{
//     content: '';
//     position: absolute;
//     height: 100%;
//     width: 50%;
//     border-right: 8px solid black;
//     border-bottom: 8px solid black;
//     top:-15%;
//     left:50%;
//     transform: rotate(45deg);
//     // background-color: black;
// }

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
// img{
//     width: 386px;
//     height: 100%;
//     // height: 448px;
// }

</style>