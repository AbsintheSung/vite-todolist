<script setup>
import { ref,watch ,watchEffect} from "vue";

const message = ref('')
const isactive = ref(false)
const textColor = 'red';

const props = defineProps({
    isEmail:{
        type:Boolean,
        default:false
    },
    isPassWord:{
        type:Boolean,
        default:false
    }
})

watchEffect(() => {
   if(props.isEmail){
    isactive.value = true
    message.value = '欄位不可以為空'
   }
  if(props.isPassWord){
    isactive.value = true
    message.value = '欄位不可以為空'
  }
})




</script>


<template>
    <p :class="[ {active:isactive} ]">{{message}}</p>
</template>


<style lang="scss" scoped>
p{
    display: none;
    margin: 0px;
}
.active{
    display: block;
    color:v-bind(textColor);
}


</style>