import { createRouter,createWebHistory,createWebHashHistory } from "vue-router"; 

const routes = [
    {
        path:"/vite-todolist",
        component:()=>import("../views/home.vue")
    },
    {
        path:"/vite-todolist/login",
        component:()=>import("../views/login.vue")
    },
    {
        path:"/vite-todolist/register",
        component:()=>import("../views/register.vue")
    },

];

const router = createRouter({
    history : createWebHistory(),
    // history:createWebHashHistory(),
    routes : routes,
})

export default router;