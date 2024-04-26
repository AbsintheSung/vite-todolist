<script setup>
import { ref , computed,onBeforeMount,onMounted, watch} from 'vue';
import { useRoute ,useRouter} from 'vue-router' ;
import { fetchAPI } from '../api/fetchAPI';
import { loginOutAPI } from '../api/loginout';
import TodoListTitle from '../components/TodoList-Title.vue';
import ListItem from '../components/listItem.vue'
import {  toastWaitMessage,updateToastMessage,updateToastMessage_Error} from '../js/toast'
import { throttle } from '../js/throttle'

const router = useRouter()
const userInput = ref('')
const token  = document.cookie.replace(/(?:(?:^|.*;\s*)TokenCode\s*\=\s*([^;]*).*$)|^.*$/, "$1");
const data = ref([])
const buttonState = ref('all');
const nickName = ref('')
const isRequest = ref(true); //在每個請求前 設置一個判斷 ，等另一個請求結束，我們才能發送其他請求

//在  onBeforeMount 時候 檢查 Token
onBeforeMount( async ()=>{
    await checkToken()
} )

// 在onMounted  獲取資料
onMounted(async ()=>{
    await getData()
})

//點擊後 修改 buttonState.value 和 顯示樣式
const handleFilter = (state)=>{ buttonState.value = state }

//資料篩選 ，透過 buttonState 是什麼 ，來將 data 內的資料作過濾篩選
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

//顯示目前 待完成的數量
const noFinishItem = computed(()=>{
    let noFinish = data.value.filter((item)=>{ if(!item.status){ return item} } )
    return noFinish.length
})

//data 沒有資料的時候 顯示
const dataShow = computed(()=>{
    if(data.value.length === 0 ) return true
    else return false
})


//點擊編輯按鈕， 改變該項目的 edit 屬性 來達到 切換 input功能( 開啟 )
function handleEdit(editData){
    const dataIndex = data.value.findIndex((item)=>{return item.id === editData.id})
    data.value.forEach((item)=>item.edit = false)
    data.value[dataIndex].edit = !data.value[dataIndex].edit
}

//點擊編輯按鈕， 改變該項目的 edit 屬性 來達到 切換 input功能( 關閉 )
function handleEditoff(editData){
    const dataIndex = data.value.findIndex((item)=>{return item.id === editData.id})
    data.value[dataIndex].edit = false
}


//檢查 TOKEN ，並獲取暱稱 。 TOKEN 若不存在跳轉到登入畫面，避免有人用網址輸入
async function checkToken(){
    try {
        const responseData = await fetchAPI('https://todolist-api.hexschool.io/users/checkout','GET',token)
        if(responseData.status) nickName.value = responseData.nickname
    } catch (error) {
        router.push('/')
    }
}


//獲取資料
async function getData() {
    if( !isRequest ) return 
    try {
        const responseData = await fetchAPI('https://todolist-api.hexschool.io/todos/','GET',token)
        isRequest.value = false
        data.value = []
        
        //針對取得後資料，添加 edit 屬性，主要目的是為了 ，使用者 去點擊A項目的編輯 開啟編輯後沒有編輯，反而再去點擊B項目的編輯時候 ，開啟B項目編輯，此時會關閉A項目的編輯
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

// 避免使用者 在 新增 刪除 修改狀態下 瘋狂 發送 api 事件，也可以讓toast訊息不會這麼頻繁觸發
const throttle_setData = throttle(setData,1000)
const throttle_handleComplete = throttle(handleComplete,1000)
const throttle_handleDelete = throttle(handleDelete,1000)
const throttle_handleEdit = throttle(editToDoList,1000)
 



</script>


<template>

    <div class="home-container">
        <header>
            <TodoListTitle />
            <p class="d-none d-sm-block ms-auto me-3 fw-bold">{{nickName}} 的代辦</p>
            <a class="login-out" @click="loginout">登出</a>
        </header>
        
        <div class="input-box">
            <input type="text" v-model="userInput" @keyup.enter="throttle_setData">
            <button class="addinput" @click="throttle_setData"><span class="material-icons-outlined">add</span></button>
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

                <ListItem v-for="item in dataFilter" :key="item.id" :sendData="item" 
                    @changeComplete="throttle_handleComplete" 
                    @deleteItem="throttle_handleDelete" 
                    @editItem="handleEdit" 
                    @editOffItem="handleEditoff" 
                    @editHandle='throttle_handleEdit'>
                </ListItem>

            </ul>


            <div class="d-flex align-items-baseline px-3">
                <p>{{noFinishItem}}個待完成項目</p>

                <!-- 無清除已完成項目API 所以這隱藏掉 -->
                <!-- <button class="ms-auto border-0 bg-white">清除已完成項目</button> -->
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