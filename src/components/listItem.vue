<script setup>
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
    }
})

async function ttt(){
    if(  props.sendData.completed_at === null){
        props.sendData.completed_at = '2024-04-11T14:15:14.933+08:00'
    }else{
        props.sendData.completed_at = null
    }

    emit('changeComplete', props.sendData)
}
</script>

<template>


    <li>
        <div @click="ttt">
            <div class="test" v-if="props.sendData.completed_at === null"></div>
            <div class="test2" v-else-if="typeof props.sendData.completed_at === 'string'"></div>
            <p>{{props.sendData.content}}</p>
            
        </div>
        <button class="edit-link"><span class="material-icons-outlined">drive_file_rename_outline</span></button>
        <button class="delete-link"><span class="material-icons-outlined delete-icon">clear</span></button>  
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
.buttonActive{
    border-bottom: 2px solid black !important;
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

.delete-link,.edit-link{
    display: flex;
    text-decoration-line: none;
    >span{
        color:black;
    }
}

</style>