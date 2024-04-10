<script setup>
import { ref } from 'vue'

const props = defineProps({
    width:{
        type:Number,
        default:386 
    },
    height:{
        type:Number,
        default:386
    }
})
const imgWidth = props.width + 'px';
const imgHeight = props.height + "px"


</script>

<template>

    <div class=" d-none d-md-block">
        <img src="../assets/img/ff8dca85661a71240c169adaabe22733.png">
    </div>
  
</template>

<style lang="scss" scoped>

img{
    width: v-bind(imgWidth);
    height: v-bind(imgHeight);
}

</style>