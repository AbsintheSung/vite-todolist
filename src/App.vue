<script setup>
import router from './router';
// https://todolist-api.hexschool.io/doc/

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const response =  toast.promise(
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        
        return data
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        return error
    }),
    {
    pending: {
        render() {
          return "I'm loading";
        },
        // other options
        icon: false,
      },
      success: {
        render(res) {
            console.log(res.data)
            return 'Hello ' + res.data.title;
        },
        // other options
        icon: '🟢',
      },
      error: {
        render(err) {
          return h('div', 'Err: ' + err.data.message);

        },

      },
  },
);
console.log(response);





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