<script setup>
import { ref , computed} from 'vue';
import TodoListTitle from '../components/TodoList-Title.vue';
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

const test = (state)=>{ buttonState.value = state }
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
                <button :class="[{buttonActive : buttonState === 'all' }]" @click="test('all')">全部</button>
                <button :class="[{buttonActive : buttonState === 'pending' }]" @click="test('pending')">待完成</button>
                <button :class="[{buttonActive : buttonState === 'finish' }]" @click="test('finish')">已完成</button>
            </div>
            
            <ul class="todo-list">
                <li v-for="item in dataFilter" :key="item.id" >
                    <div>
                        <!-- <input type="checkbox" :id=item.id name="" >
                        <label :for=item.id @mousedown.prevent>{{item.content}}</label> -->
                        <div class="test"></div>
                        <span>{{item.content}}</span>
                    </div>
                    <button class="edit-link"><span class="material-icons-outlined">drive_file_rename_outline</span></button>
                    <button class="delete-link"><span class="material-icons-outlined delete-icon">clear</span></button>  
                </li>

                <!-- <li>
                    <div>
                        <input type="checkbox" id="item1" name="item1" value="">
                        <label for="item1" @mousedown.prevent>把冰箱發霉的檸檬拿去丟</label>
                    </div>
                    <button class="edit-link"><span class="material-icons-outlined">drive_file_rename_outline</span></button>
                    <button class="delete-link"><span class="material-icons-outlined delete-icon">clear</span></button>  
                </li>

                <li>
                    <div>
                        <input type="checkbox" id="item2" name="item2" value="">
                        <label for="item2"  @mousedown.prevent>打電話叫媽媽匯款給我</label>
                    </div>
                    <button class="edit-link"><span class="material-icons-outlined">drive_file_rename_outline</span></button>
                    <button class="delete-link"><span class="material-icons-outlined delete-icon">clear</span></button>  
                </li>

                <li>
                    <div>
                        <input type="checkbox" id="item3" name="item3" value="">
                        <label for="item3"  @mousedown.prevent>整理電腦資料夾</label>
                    </div>
                    <button class="edit-link"><span class="material-icons-outlined">drive_file_rename_outline</span></button>
                    <button class="delete-link"><span class="material-icons-outlined">clear</span></button>  
                </li>

                <li>
                    <div>
                        <input type="checkbox" id="item4" name="item4" value="">
                        <label for="item4" @mousedown.prevent>繳電費水費瓦斯費</label>
                    </div>
                    <button class="edit-link"><span class="material-icons-outlined">drive_file_rename_outline</span></button>
                    <button class="delete-link"><span class="material-icons-outlined delete-icon">clear</span></button>  
                </li>

                <li>
                    <div>
                        <input type="checkbox" id="item5" name="item5" value="">
                        <label for="item5"  @mousedown.prevent>約vicky禮拜三泡溫泉</label>
                    </div>
                    <button class="edit-link"><span class="material-icons-outlined">drive_file_rename_outline</span></button>
                    <button class="delete-link"><span class="material-icons-outlined delete-icon">clear</span></button>  
                </li>

                <li>
                    <div>
                        <input type="checkbox" id="item6" name="item6" value="">
                        <label for="item6"  @mousedown.prevent>約ada禮拜四吃晚餐</label>
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
.test{
    display: inline-block;
    width: 20px;
    border: 1px solid #9F9A91;
    height: 20px;
    border-radius: 5px;
}
.buttonActive{
    border-bottom: 2px solid black !important;
}
li{
    display: flex;
    align-items: center;
    margin: 16px 0px;
    >div{
        width: 100%;
        padding-bottom: 16px;
        border-bottom:1px solid #E5E5E5 ;
        >label{
            margin-left: 16px;
        }
    }
    >button{
        align-self: flex-start;
    }
}
.delete-link,.edit-link{
    display: flex;
    text-decoration-line: none;
    >span{
        color:black;
    }
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
    // background-color: #FFFFFF;
    // border-radius: 0px 0px 10px 10px;
    padding: 16px;
}



</style>