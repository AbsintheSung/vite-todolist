<script setup>
import TodoListTitle from '../components/TodoList-Title.vue';


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

        <div>
            <button>全部</button>
            <button>待完成</button>
            <button>已完成</button>
        </div>
        
        <ul>
            <li>
                <input type="checkbox" id="item1" name="item1" value="">
                <label for="item1">事項 - 1</label>
                <a><span class="material-icons-outlined delete-icon">clear</span></a>  
            </li>

            <li>
                <input type="checkbox" id="item1" name="item1" value="">
                <label for="item1">事項 - 1</label>
                <a><span class="material-icons-outlined delete-icon">clear</span></a>  
            </li>

            <li>
                <input type="checkbox" id="item1" name="item1" value="">
                <label for="item1">事項 - 1</label>
                <a><span class="material-icons-outlined delete-icon">clear</span></a>  
            </li>

            <li>
                <input type="checkbox" id="item1" name="item1" value="">
                <label for="item1">事項 - 1</label>
                <a><span class="material-icons-outlined delete-icon">clear</span></a>  
            </li>

        </ul>

    </div>

    
    
    
</template>


<style lang="scss" scoped>
li{
    display: flex;
    align-items: center
}
.delete-icon{
    height: 100%;
}
// header{
//     display: flex;
//     justify-content: space-between;
//     padding-top: 16px;
// }
// .input-box{
//     position: relative;
//     margin: 16px 0px;
//     >input{
//         width: 100%;
//         padding: 12px 16px;
//     }
// }
// .addinput{
//     position: absolute;
//     top: 50%;
//     right:4px;
//     transform: translateY(-50%);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 40px;
//     height: 40px;
//     color: white;
//     border: none;
//     border-radius: 10px;
//     background-color: black;
// }

</style>