<script setup>
import { ref } from 'vue';
const props = defineProps({
    fontSize:{
        type:Number,
        default:24,
    },
    checkWidth:{
        type:Number,
        default:32,
    },
    checkHeight:{
        type:Number,
        default:32,
    },
})

const fontSize = props.fontSize + 'px';
const checkWidth = props.checkWidth + 'px';
const checkHeight = props.checkHeight + 'px';

</script>

<template>
  
  <h1 class="tolist-title fs-32 fw-bold text-center fm-Baloo-Thambi"><p class="title-check"></p>ONLINE TODO LIST</h1>

</template>


<style lang="scss" scoped>
.tolist-title{
    display: flex;
    justify-content: center;
    margin: 0px;
    font-size: v-bind(fontSize);
}
.title-check{
    position: relative;
    margin-right: 4px;
    width:v-bind(checkWidth);
    height:v-bind(checkHeight);
    border: 2px solid black;
    transform: rotate(-9.39deg);
}
.title-check::before{
    content: '';
    position: absolute;
    height: 100%;
    width: 50%;
    border-right: 8px solid black;
    border-bottom: 8px solid black;
    top:-15%;
    left:50%;
    transform: rotate(45deg);
}
</style>