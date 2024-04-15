<script setup>
import router from './router';
// https://todolist-api.hexschool.io/doc/


</script>

<template>

    <div class="container-fluid bgtest  px-0 ">
        <router-view></router-view>
    </div>
  

</template>

<style lang="scss">
.bgtest{
    min-height: 100vh;
    background-color: #FFD370;
    // background: linear-gradient(170deg, #FFD370 55%, #FFFFFF 45%);
}

    
</style>