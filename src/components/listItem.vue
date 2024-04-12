<script setup>
import { ref } from 'vue'
const isEdit = ref(false) //是否是以編輯狀態
const props = defineProps({

    sendData:{
        type:Object,
        default:()=>{
            return {}
        }
    },
})

const emit = defineEmits({
    changeComplete:(data)=>{
        if(typeof data === "object"){
            return true
        }
    },
    deleteItem:(data)=>{
        if(typeof data === "object"){
            return true
        }
    }
})

function sendComplete(){
    // props.sendData.status = !props.sendData.status
    emit('changeComplete', props.sendData)
}
function sendDelete(){
    emit('deleteItem', props.sendData)
}
function handleEdit(){
    isEdit.value = !isEdit.value
}


</script>

<template>


    <li>
        
        <div v-if="isEdit">
            <input class="edit-input" type="text" :value="props.sendData.content">
        </div>
        <div v-else @click="sendComplete">
            <div class="test" v-if="!props.sendData.status"></div>
            <div class="test2" v-else></div>
            <p>{{props.sendData.content}}</p>
            
        </div>
        <button class="edit-link" @click="handleEdit" v-if="!isEdit"><span class="material-icons-outlined">drive_file_rename_outline</span></button>
        <button class="edit-off-link" @click="handleEdit" v-else><span class="material-icons-outlined"> edit_off </span></button>
        <button class="delete-link" @click="sendDelete"><span class="material-icons-outlined delete-icon">clear</span></button>  
    </li>
    

  
   <div></div>
</template>


<style lang="scss" scoped>
.test{
    display: inline-block;
    width: 20px;
    border: 1px solid #9F9A91;
    height: 20px;
    border-radius: 5px;
}
.test2{
    display: inline-block;
    margin-right: 8px;
    width: 12px;
    height: 20px;
    border-bottom: 5px solid #FFD370;
    border-right: 5px solid #FFD370;
    transform: rotate(45deg);
}

li{
    display: flex;
    align-items: center;
    margin: 16px 0px;
    >div{
        display: flex;
        width: 100%;
        padding-bottom: 16px;
        border-bottom:1px solid #E5E5E5 ;
        >p{
            margin-left: 16px;
        }

    }
    >div:hover{
        cursor: pointer;
    }
    >button{
        align-self: flex-start;
    }
}

.delete-link,.edit-link,.edit-off-link{
    display: flex;
    text-decoration-line: none;
    >span{
        color:black;
    }
}
.edit-input{
    padding: 8px 16px;
    width: 100%;
    border: none;
    background-color: #FFD370;
}
</style>