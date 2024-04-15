<script setup>
import { ref , computed,onBeforeMount,onMounted} from 'vue';
import TodoListTitle from '../components/TodoList-Title.vue';
import ListItem from '../components/listItem.vue'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const userInput = ref('')
const token = ""

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
        let response = await fetch('https://todolist-api.hexschool.io/todos/',
        
        {
            headers: {
                'Authorization': `${token}`
            }
        })
      
        if( !response.ok ){
            let errorMessage = await response.json();
            console.log('錯誤資訊',errorMessage)
            // throw new Error(errorMessage)
        }
        
        const responseData = await response.json();
        responseData.data.forEach((item)=>{
            item.edit = false
            data.value.push(item)
        })
        // console.log(data.value)
    } catch (error) {
        
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
        let response = await fetch('https://todolist-api.hexschool.io/todos/',
        {
            headers: {
                'Authorization': `${token}`
            }
        })
        if( !response.ok ){
            let errorMessage = await response.json();
            console.log('錯誤資訊',errorMessage)
            // throw new Error(errorMessage)
        }
        
        const responseData = await response.json();
        data.value = []
        responseData.data.forEach((item)=>{
            item.edit = false
            data.value.push(item)
        })
        // console.log(data.value)
    } catch (error) {
        
    }
   
};

//新增 代辦事項
async function setData(){
    try {
        const sendContent = {
            "content":userInput.value
        }
        const response = await fetch('https://todolist-api.hexschool.io/todos/',{
            cache: "no-cache",
            body:JSON.stringify(sendContent),
            headers: {
                "content-type": "application/json",
                'Authorization': `${token}`
            },
            method: "POST"
        })
        if( !response.ok ){
            let errorMessage = await response.json();
            console.log('錯誤資訊',errorMessage)
            // throw new Error(errorMessage)
        }
        const responseData = await response.json()
        console.log(responseData)
        if(responseData.status){
            // data.value.push(responseData.newTodo)
            getData();
            userInput.value = ''
          
        }
    } catch (error) {
        
    }
}

//狀態完成 或 未完成切換
async function handleComplete(itemData){
    try {
        let id = itemData.id
        let response = await fetch(`https://todolist-api.hexschool.io/todos/${id}/toggle`,{
            cache: "no-cache",
            headers: {
                "content-type": "application/json",
                'Authorization': `${token}`
            },
            method: "PATCH",}
        )
        if( !response.ok ){
            let errorMessage = await response.json();
            console.log('錯誤資訊',errorMessage)
            // throw new Error(errorMessage)
        }
            
        const responseData = await response.json();
        console.log(responseData)
        if(responseData.status){
            getData()
            // const tempId = itemData.id
            // const dataIndex = data.value.findIndex((item)=>{return item.id === tempId})
            // data.value[dataIndex].status = !data.value[dataIndex].status
        }
    } catch (error) {
        
    }
   
}

//刪除事項
async function handleDelete(deleteData){
    // console.log(deleteData)
    try {
        const response = await fetch(`https://todolist-api.hexschool.io/todos/${deleteData.id}`,{
            cache: "no-cache",
            headers: {
                "content-type": "application/json",
                'Authorization': `${token}`
            },
            method: "DELETE",}
        )
        if( !response.ok ){
            let errorMessage = await response.json();
            console.log('錯誤資訊',errorMessage)
            // throw new Error(errorMessage)
        }
        const responseData = await response.json();
        console.log(responseData)
        if(responseData.status){
            getData()
        }
    } catch (error) {
        
    }
}

//修改事項
async function editToDoList(dataObj,strData){
    try {
        const sendContent = {
            content:dataObj.content
        }
        const response = await fetch(`https://todolist-api.hexschool.io/todos/${dataObj.id}`,{
            cache: "no-cache",
            body:JSON.stringify({ content : strData }),
            headers: {
                "content-type": "application/json",
                'Authorization': `${token}`
            },
            method: "PUT",}
        )
        if( !response.ok ){
            let errorMessage = await response.json();
            console.log('錯誤資訊',errorMessage)
            // throw new Error(errorMessage)
        }
        const responseData = await response.json();
        console.log(responseData)
        if(responseData.status){
            getData()
        }
    } catch (error) {
        
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
            <router-link style="color: red;" to="login">登出</router-link>
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

.buttonActive{
    border-bottom: 2px solid black !important;
}



</style>