<script setup>
import TodoListTitle from '../components/TodoList-Title.vue';
import { useRoute } from 'vue-router';
const currentRoute = useRoute();
console.log(currentRoute.fullPath)

</script>


<template>
 
    <div class="home-container">
        <header>
            <TodoListTitle />
            <!-- <a>登出</a> -->
            <router-link style="color: red;" to="login">登出</router-link>
        </header>
        
        <div class="input-box">
            <input type="text">
            <button class="addinput"><span class="material-icons-outlined">add</span></button>
        </div>

        <div class="list-box">
            <div class="filter-btnbox">
                <button>全部</button>
                <button>待完成</button>
                <button>已完成</button>
            </div>
            
            <ul class="todo-list">
                <li>
                    <div>
                        <input type="checkbox" id="item1" name="item1" value="">
                        <label for="item1"  @mousedown.prevent>把冰箱發霉的檸檬拿去丟</label>
                    </div>
                  
                    <a class="delete-link"><span class="material-icons-outlined delete-icon">clear</span></a>  
                </li>

                <li>
                    <div>
                        <input type="checkbox" id="item2" name="item2" value="">
                        <label for="item2"  @mousedown.prevent>打電話叫媽媽匯款給我</label>
                    </div>
                    <a class="delete-link"><span class="material-icons-outlined delete-icon">clear</span></a>  
                </li>

                <li>
                    <div>
                        <input type="checkbox" id="item3" name="item3" value="">
                        <label for="item3"  @mousedown.prevent>整理電腦資料夾</label>
                    </div>
                    <a class="delete-link"><span class="material-icons-outlined">clear</span></a>  
                </li>

                <li>
                    <div>
                        <input type="checkbox" id="item4" name="item4" value="">
                        <label for="item4" @mousedown.prevent>繳電費水費瓦斯費</label>
                    </div>
                    <a class="delete-link"><span class="material-icons-outlined delete-icon">clear</span></a>  
                </li>

                <li>
                    <div>
                        <input type="checkbox" id="item5" name="item5" value="">
                        <label for="item5"  @mousedown.prevent>約vicky禮拜三泡溫泉</label>
                    </div>
                    <a class="delete-link"><span class="material-icons-outlined delete-icon">clear</span></a>  
                </li>

                <li>
                    <div>
                        <input type="checkbox" id="item6" name="item6" value="">
                        <label for="item6"  @mousedown.prevent>約ada禮拜四吃晚餐</label>
                    </div>
                    <a class="delete-link"><span class="material-icons-outlined delete-icon">clear</span></a>  
                </li>

            </ul>
            <div>測試</div>
        </div>
       

    </div>

    
    
    
</template>


<style lang="scss" scoped>

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
    >a{
        align-self: flex-start;
    }
}
.delete-link{
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