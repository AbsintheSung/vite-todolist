<script setup>
import router from './router';
// https://todolist-api.hexschool.io/doc/

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    let data =  await response.json();
    console.log(data)
    return data
  } catch (error) {
    throw new Error('Error fetching data: ');
  }
};

const displayPromise = () => {
  
  toast.promise(
    fetchData(),
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
          console.log('success',res)
          return 'Hello ' + res.data.message;
        },
        // other options
        icon: '🟢',
        "theme": "dark",
        "type": "info",
        "autoClose": 1000,
        "transition": "slide",
      },
      error: {
        render(err) {
          console.log('error',err)
  
          return err.data.message
        },
        "autoClose": 1000,
        "transition": "slide",
       
      },
    },
    {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true, // 关闭进度条
      // autoClose: 1000, // 指定消息自动关闭的延迟时间（毫秒）
    }
  );
};

displayPromise()



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