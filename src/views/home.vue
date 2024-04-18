<script setup>
import { ref , computed,onBeforeMount,onMounted} from 'vue';
import { useRoute ,useRouter} from 'vue-router' ;
import { fetchAPI } from '../api/fetchAPI';
import { loginOutAPI } from '../api/loginout';
import TodoListTitle from '../components/TodoList-Title.vue';
import ListItem from '../components/listItem.vue'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter()

const userInput = ref('')
let token  = document.cookie.replace(/(?:(?:^|.*;\s*)TokenCode\s*\=\s*([^;]*).*$)|^.*$/, "$1");

const notify = (message)=>{
    toast.success(message,{
        autoColose:3000,
        position:toast.POSITION.TOP_CENTER,
    })
}


const data = ref([])
const buttonState = ref('all');

onBeforeMount(async ()=>{
    try {
        const responseData = await fetchAPI('https://todolist-api.hexschool.io/todos/','GET',token)
        responseData.data.forEach((item)=>{
            item.edit = false
            data.value.push(item)
        })
    } catch (error) {
        console.error(error)
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

async function getData() {
    try {
        const responseData = await fetchAPI('https://todolist-api.hexschool.io/todos/','GET',token)
        data.value = []
        responseData.data.forEach((item)=>{
            item.edit = false
            data.value.push(item)
        })
    } catch (error) {
        console.error(error)
    }
};

//新增 代辦事項
async function setData(){
    const sendContent = {
        "content":userInput.value
    }
    try {
        const response = await fetchAPI('https://todolist-api.hexschool.io/todos/','POST',token,sendContent)
        // console.log('response',response)
        if(response.status){
            getData();
            userInput.value = ''
        }
    } catch (error) {
        console.error(error)
    }
}

//狀態完成 或 未完成切換
async function handleComplete(itemData){
    try {
        const id = itemData.id
        const response = await fetchAPI(`https://todolist-api.hexschool.io/todos/${id}/toggle`,"PATCH",token)
        if(response.status){
            getData()
        }
    } catch (error) {
        console.error('更新狀態失敗',error)
    }
}

//刪除事項
async function handleDelete(deleteData){
    // console.log(deleteData)
    try {
        const id = deleteData.id 
        const response = await fetchAPI(`https://todolist-api.hexschool.io/todos/${id}`,"DELETE",token)
        if(response.status){
            getData()
        }
    } catch (error) {
        console.error('刪除失敗',error)
    }
}

//修改事項
async function editToDoList(dataObj,strData){
    try {
        const id = dataObj.id 
        const newContent = {
            content : strData
        }
        const response = await fetchAPI(`https://todolist-api.hexschool.io/todos/${id}`,"PUT",token,newContent)
        if(response.status){
            getData()
        }
    } catch (error) {
        console.error('修改失敗',error)
    }
}

async function loginout(){
    try {
        const data = await loginOutAPI('https://todolist-api.hexschool.io/users/sign_out', 'POST',token);
        // console.log('正確資訊', data);
        // console.log(data.token);
        if(data.status){
            document.cookie = `TokenCode=${token}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            router.push('/')
        }
    } catch (error) {
        console.error(error)
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