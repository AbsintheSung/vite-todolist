<script setup>
import { ref , computed,onBeforeMount,onMounted} from 'vue';
import { useRoute ,useRouter} from 'vue-router' ;
import { fetchAPI } from '../api/fetchAPI';
import { loginOutAPI } from '../api/loginout';
import TodoListTitle from '../components/TodoList-Title.vue';
import ListItem from '../components/listItem.vue'
import {  toastWaitMessage,updateToastMessage,updateToastMessage_Error} from '../js/toast'

const router = useRouter()
const userInput = ref('')
const token  = document.cookie.replace(/(?:(?:^|.*;\s*)TokenCode\s*\=\s*([^;]*).*$)|^.*$/, "$1");
const data = ref([])
const buttonState = ref('all');
const nickName = ref('')
const isRequest = ref(true); //在每個請求前 設置一個判斷 ，等另一個請求結束，我們才能發送其他請求

onBeforeMount(async ()=>{
    if(!isRequest) return 
    toastWaitMessage('資料讀取中')
    try {
        const responseData = await fetchAPI('https://todolist-api.hexschool.io/todos/','GET',token)
        isRequest.value = false
        updateToastMessage('讀取成功')
        responseData.data.forEach((item)=>{
            item.edit = false
            data.value.push(item)
        })
    } catch (error) {
        updateToastMessage_Error(error)
    }finally{
        isRequest.value = true
    }
  
})

const handleFilter = (state)=>{ buttonState.value = state }
const dataFilter = computed(()=>{
    
    if(buttonState.value==='all'){
        return data.value
    }
    if(buttonState.value==='pending'){
        return  data.value.filter((item)=>{ if(!item.status){ return item} } )
    }
    if(buttonState.value==='finish'){
        return data.value.filter((item)=>{ if(item.status){ return item} } )
    }
})
const noFinishItem = computed(()=>{
    let noFinish = data.value.filter((item)=>{ if(!item.status){ return item} } )
    return noFinish.length
})

const dataShow = computed(()=>{
    if(data.value.length === 0 ) return true
    else return false
})

//檢查token，並獲取暱稱
async function checkToken(){
    try {
        const responseData = await fetchAPI('https://todolist-api.hexschool.io/users/checkout','GET',token)
        if(responseData.status) nickName.value = responseData.nickname
    } catch (error) {
        // console.error(error)
    }
}
checkToken()

async function getData() {
    if( !isRequest ) return 
    try {
        const responseData = await fetchAPI('https://todolist-api.hexschool.io/todos/','GET',token)
        isRequest.value = false
        data.value = []
        responseData.data.forEach((item)=>{
            item.edit = false
            data.value.push(item)
        })
    } catch (error) {
        // console.error(error)
    }finally{
        isRequest.value = true
    }
};

//新增 代辦事項
async function setData(){
    const sendContent = {
        "content":userInput.value
    }
    if( !isRequest ) return 
    try {
        toastWaitMessage('新增中')
        const response = await fetchAPI('https://todolist-api.hexschool.io/todos/','POST',token,sendContent)
        isRequest.value = false
        // console.log('response',response)
        if(response.status){
            updateToastMessage('新增成功')
            getData();
            userInput.value = ''
        }
    } catch (error) {
        // console.error(error)
        updateToastMessage_Error(error)
    }finally{
        isRequest.value = true
    }
}

//狀態完成 或 未完成切換
async function handleComplete(itemData){
    if( !isRequest ) return 
    try {
        toastWaitMessage('修改中')
        const id = itemData.id
        isRequest.value = false
        const response = await fetchAPI(`https://todolist-api.hexschool.io/todos/${id}/toggle`,"PATCH",token)
        if(response.status){
            updateToastMessage('修改完成')
            getData()
        }
    } catch (error) {
        updateToastMessage_Error(error)
    }finally{
        isRequest.value = true
    }
}

//刪除事項
async function handleDelete(deleteData){
    // console.log(deleteData)
    if( !isRequest ) return 
    try {
        const id = deleteData.id 
        isRequest.value = false
        toastWaitMessage('刪除中')
        const response = await fetchAPI(`https://todolist-api.hexschool.io/todos/${id}`,"DELETE",token)
        if(response.status){
            updateToastMessage('刪除完成')
            getData()
        }
    } catch (error) {
        updateToastMessage_Error(error)
    }finally{
        isRequest.value = true
    }
}

//修改事項
async function editToDoList(dataObj,strData){
    if( !isRequest ) return 
    try {
        const id = dataObj.id 
        const newContent = {
            content : strData
        }
        isRequest.value = false
        toastWaitMessage('修改中')
        const response = await fetchAPI(`https://todolist-api.hexschool.io/todos/${id}`,"PUT",token,newContent)
        if(response.status){
            updateToastMessage('內容修改完成')
            getData()
        }
    } catch (error) {
        updateToastMessage_Error(error)
    }finally{
        isRequest.value = true
    }
}

//登出
async function loginout(){
    if( !isRequest ) return 
    try {
        toastWaitMessage('登出中')
        isRequest.value = false
        const data = await loginOutAPI('https://todolist-api.hexschool.io/users/sign_out', 'POST',token);
        if(data.status){
            document.cookie = `TokenCode=${token}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            updateToastMessage('登出成功')
            router.push('/')
        }
    } catch (error) {
        // console.error(error)
        updateToastMessage_Error(error)
    }finally{
        isRequest.value = true
    }
}


function handleEdit(editData){
    const dataIndex = data.value.findIndex((item)=>{return item.id === editData.id})
    data.value.forEach((item)=>item.edit = false)
    data.value[dataIndex].edit = !data.value[dataIndex].edit
}
function handleEditoff(editData){
    const dataIndex = data.value.findIndex((item)=>{return item.id === editData.id})
    data.value[dataIndex].edit = false
}


</script>


<template>

    <div class="home-container">
        <header>
            <TodoListTitle />
            <p class="d-none d-sm-block ms-auto me-3 fw-bold">{{nickName}} 的代辦</p>
            <a class="login-out" @click="loginout">登出</a>
        </header>
        
        <div class="input-box">
            <input type="text" v-model="userInput" @keyup.enter="setData">
            <button class="addinput" @click="setData"><span class="material-icons-outlined">add</span></button>
        </div>
        <div v-if="dataShow">
            <h3 class="text-center">目前尚無代辦事項</h3>
            <img class="img-nolist" src="../assets/img/8911ab6dcbda98df56e26aa23c6643ac.png">
        </div>

        <div class="list-box" v-else>

            <div class="filter-btnbox">
                <button :class="[{buttonActive : buttonState === 'all' }]" @click="handleFilter('all')">全部</button>
                <button :class="[{buttonActive : buttonState === 'pending' }]" @click="handleFilter('pending')">待完成</button>
                <button :class="[{buttonActive : buttonState === 'finish' }]" @click="handleFilter('finish')">已完成</button>
            </div>
            
            <ul class="todo-list">

                <ListItem v-for="item in dataFilter" :key="item.id" :sendData="item" @changeComplete="handleComplete" @deleteItem="handleDelete" @editItem="handleEdit" @editOffItem="handleEditoff" @editHandle='editToDoList'></ListItem>

            </ul>


            <div class="d-flex align-items-baseline px-3">
                <p>{{noFinishItem}}個待完成項目</p>
                <button class="ms-auto border-0 bg-white">清除已完成項目</button>
            </div>

        </div>
       

    </div>

</template>


<style lang="scss" scoped>
.login-out{
    color:black;
    text-decoration: none;
}
.login-out:hover{
    cursor: pointer;
    color:red;
}
.buttonActive{
    border-bottom: 2px solid black !important;
}



</style>