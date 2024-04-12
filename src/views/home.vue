<script setup>
//https://todolist-api.hexschool.io/doc/#/
import { ref , computed,onBeforeMount,onMounted} from 'vue';
import TodoListTitle from '../components/TodoList-Title.vue';
import ListItem from '../components/listItem.vue'
import { useRoute } from 'vue-router';
const userInput = ref('')

// const data = ref( [
//     {
//       "content": "繳電費，水電費，瓦斯費",
//       "createTime": 1712890590,
//       "id": "-NvFE2BkJ3GRWB18jEgS",
//       "status": false
//     },
//     {
//       "content": "整理電腦資料夾",
//       "createTime": 1712890625,
//       "id": "-NvFEAoKjhurO1wkJ3zC",
//       "status": false
//     },
//     {
//       "content": "打電話叫老媽匯款給我",
//       "createTime": 1712890660,
//       "id": "-NvFEJKsYMUDDrDA7nJa",
//       "status": true
//     },
//     {
//       "content": "把冰箱發霉的檸檬拿去丟",
//       "createTime": 1712890677,
//       "id": "-NvFENQg_XvDxFsuJd7k",
//       "status": false
//     },
//     {
//       "content": "我要吃晚餐",
//       "createTime": 1712890688,
//       "id": "-NvFEQ9sF0P4ofITu6iG",
//       "status": false
//     },
//     {
//       "content": "我要買飲料",
//       "createTime": 1712890696,
//       "id": "-NvFES4faKIPQ7LoJMzT",
//       "status": true
//     },
//     {
//       "content": "我要幹大事",
//       "createTime": 1712890703,
//       "id": "-NvFETsFpBQJgsVEMzMu",
//       "status": true
//     }
//   ])


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
        responseData.data.forEach((item)=>data.value.push(item))
        // console.log(data.value)
    } catch (error) {
        
    }
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
        responseData.data.forEach((item)=>data.value.push(item))
        // console.log(data.value)
    } catch (error) {
        
    }
   
};


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
        }
    } catch (error) {
        
    }
}

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
            <img class="imgtest" src="../assets/img/8911ab6dcbda98df56e26aa23c6643ac.png">
        </div>
        <div class="list-box" v-else>
            <div class="filter-btnbox">
                <button :class="[{buttonActive : buttonState === 'all' }]" @click="handleFilter('all')">全部</button>
                <button :class="[{buttonActive : buttonState === 'pending' }]" @click="handleFilter('pending')">待完成</button>
                <button :class="[{buttonActive : buttonState === 'finish' }]" @click="handleFilter('finish')">已完成</button>
            </div>
            
            <ul class="todo-list">

                <ListItem v-for="item in dataFilter" :key="item.id" :sendData="item" @changeComplete="handleComplete" @deleteItem="handleDelete"></ListItem>
                <!-- <li v-for="item in dataFilter" :key="item.id" >
                    <div @click="www(item.id)">
                        <div class="test" v-if="item.completed_at === null"></div>
                        <div class="test2" v-else-if="typeof item.completed_at === 'string'"></div>
                        <p>{{item.content}}</p>
                        
                    </div>
                    <button class="edit-link"><span class="material-icons-outlined">drive_file_rename_outline</span></button>
                    <button class="delete-link"><span class="material-icons-outlined delete-icon">clear</span></button>  
                </li> -->

              

            </ul>
            <div class="d-flex align-items-baseline px-3">
                <p>{{noFinishItem}}個待完成項目</p>
                <button class="ms-auto border-0 bg-white">清除已完成項目</button>
            </div>

        </div>
       

    </div>

    
    
    
</template>


<style lang="scss" scoped>
.imgtest{
    width: 100%;
    height: 100%;
}
// .test{
//     display: inline-block;
//     width: 20px;
//     border: 1px solid #9F9A91;
//     height: 20px;
//     border-radius: 5px;
// }
// .test2{
//     display: inline-block;
//     margin-right: 8px;
//     width: 12px;
//     height: 20px;
//     border-bottom: 5px solid #FFD370;
//     border-right: 5px solid #FFD370;
//     transform: rotate(45deg);
// }

// li{
//     display: flex;
//     align-items: center;
//     margin: 16px 0px;
//     >div{
//         display: flex;
//         width: 100%;
//         padding-bottom: 16px;
//         border-bottom:1px solid #E5E5E5 ;
//         >p{
//             margin-left: 16px;
//         }

//     }
//     >div:hover{
//         cursor: pointer;
//     }
//     >button{
//         align-self: flex-start;
//     }
// }

// .delete-link,.edit-link{
//     display: flex;
//     text-decoration-line: none;
//     >span{
//         color:black;
//     }
// }
.buttonActive{
    border-bottom: 2px solid black !important;
}
.list-box{
    margin: 0 auto;
}
.filter-btnbox{
    display: flex;
    >button{
        flex:1;
        border: none;
        padding: 16px 0px;
        background-color: #FFFFFF;
        border-bottom: 2px solid #EFEFEF;
    }
    >button:first-child{
        border-radius: 10px 0px 0px 0px;
    }
    >button:last-child{
        border-radius: 0px 10px 0px 0px;
    }
    >button:hover{
        border-bottom: 2px solid black;
    }
    
}
.todo-list{
    padding: 16px;
}



</style>