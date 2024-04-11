<script setup>
import { ref , computed} from 'vue';
import TodoListTitle from '../components/TodoList-Title.vue';
import ListItem from '../components/listItem.vue'
import { useRoute } from 'vue-router';
const userInput = ref('')
const data = ref({
  "todos": [
    {
      "id": "fac3ab3af26f6a90c8db94a024ecdd27",
      "content": "繳電費水費瓦斯費",
      "completed_at": null
    },
    {
      "id": "091e37fffb47ea2bf43e3afe1ed68310",
      "content": "整理電腦資料夾",
      "completed_at": '2024-04-11T14:15:14.933+08:00'
    },
    {
      "id": "ef6326e91350c71a49b7d4d843d9f9a8",
      "content": "打電話叫媽媽匯款給我",
      "completed_at": null
    },
    {
      "id": "9d99c0ba8bfef971a3edca219be64a0f",
      "content": "把冰箱發霉的檸檬拿去丟",
      "completed_at": '2024-04-11T14:15:14.933+08:00'
    },
    {
      "id": "f4f4ac13401bfc22719cbb34d295b060",
      "content": "我要吃晚餐",
      "completed_at": null
    },
    {
      "id": "64d86a7ea504fd1423933b5f4ce3ef06",
      "content": "我要買飲料",
      "completed_at": '2024-04-11T14:15:14.933+08:00'
    },
    {
      "id": "0756aa8d571d1f8f412f23cebeb43b45",
      "content": "我要幹大事",
      "completed_at": null
    }
  ]
})

const buttonState = ref('all');

const handleFilter = (state)=>{ buttonState.value = state }
const dataFilter = computed(()=>{
    
    if(buttonState.value==='all'){
        return data.value.todos
    }
    if(buttonState.value==='pending'){
        return  data.value.todos.filter((item)=>{ if(item.completed_at === null){ return item} } )
    }
    if(buttonState.value==='finish'){
        return data.value.todos.filter((item)=>{ if(typeof item.completed_at==='string'){ return item} } )
    }
})
const noFinishItem = computed(()=>{
    let noFinish = data.value.todos.filter((item)=>{ if(item.completed_at===null){ return item} } )
    return noFinish.length
})

async function sendData(){
    console.log(userInput.value)
}
// async function www(id){
//     let indexOf = data.value.todos.findIndex((item)=>item.id ===id )
//     console.log( indexOf)
//     if( data.value.todos[indexOf].completed_at === null){
//         data.value.todos[indexOf].completed_at = '2024-04-11T14:15:14.933+08:00'
//     }else{
//         data.value.todos[indexOf].completed_at = null
//     }
   
// }
function ttaa(data){
    console.log(data)
}

</script>


<template>
 
    <div class="home-container">
        <header>
            <TodoListTitle />
            <!-- <a>登出</a> -->
            <router-link style="color: red;" to="login">登出</router-link>
        </header>
        
        <div class="input-box">
            <input type="text" v-model="userInput" @keyup.enter="sendData">
            <button class="addinput" @click="sendData"><span class="material-icons-outlined">add</span></button>
        </div>

        <div class="list-box">
            <div class="filter-btnbox">
                <button :class="[{buttonActive : buttonState === 'all' }]" @click="handleFilter('all')">全部</button>
                <button :class="[{buttonActive : buttonState === 'pending' }]" @click="handleFilter('pending')">待完成</button>
                <button :class="[{buttonActive : buttonState === 'finish' }]" @click="handleFilter('finish')">已完成</button>
            </div>
            
            <ul class="todo-list">

                <ListItem v-for="item in dataFilter" :key="item.id" :sendData="item" @changeComplete="ttaa"></ListItem>
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