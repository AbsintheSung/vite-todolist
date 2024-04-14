<script setup>
import { ref } from 'vue'
// const isEdit = ref(false) //是否是以編輯狀態
const editContent = ref('')
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
    },
    editItem:(data)=>{
        if(typeof data === "object"){
            return true
        }
    },
    editOffItem:(data)=>{
        if(typeof data === "object"){
            return true
        }
    },
    editHandle:(data,str)=>{
        if(typeof data === "object"&&typeof str === 'string'){
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
function sendEdit(){
    emit('editItem', props.sendData)
}
function sendEditOff(){
    emit('editOffItem', props.sendData)
}
function sendEditItem(){
    emit('editHandle',props.sendData, editContent.value  )
    
}
function userInput($event){
    editContent.value = $event.target.value
}


</script>

<template>


    <li>
        <div class="edit-box" v-if="props.sendData.edit">
            <input class="edit-input" type="text" :value="props.sendData.content" @input="userInput" @keyup.enter="sendEditItem">
            <button class="edit-addbtn" @click="sendEditItem"><span class="material-icons-outlined">add</span></button>
        </div>
        <div v-else @click="sendComplete">
            <div class="is-nocheck" v-if="!props.sendData.status"></div>
            <div class="is-check" v-else></div>
            <p>{{props.sendData.content}}</p>  
        </div>
        <button class="edit-link" @click="sendEdit" v-if="!props.sendData.edit"><span class="material-icons-outlined">drive_file_rename_outline</span></button>
        <button class="edit-off-link" @click="sendEditOff" v-else><span class="material-icons-outlined"> edit_off </span></button>
        <button class="delete-link" @click="sendDelete"><span class="material-icons-outlined delete-icon">clear</span></button>  
    </li>
 

</template>


<style lang="scss" scoped>
.is-nocheck{
    display: inline-block;
    width: 20px;
    border: 1px solid #9F9A91;
    height: 20px;
    border-radius: 5px;
}
.is-check{
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
.edit-box{
    position: relative;
}
.edit-input{
    margin-bottom: 8px;
    padding: 4px;
    width: 80%;
    border: none;
    background-color: #FFD370;
}
.edit-addbtn{
    position: absolute;
    top: 50%;
    right:calc(20% + 4px);
    transform: translateY(-100%);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    width: 24px;
    height: 24px;
}
</style>