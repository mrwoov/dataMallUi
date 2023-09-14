import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "portal_index",
        component: () => import("../views/portalIndex.vue")
    },
    {
        path: "/user/login",
        name: "user_login",
        component: () => import("../views/login.vue")
    },
    {
        path:"/categories/:categories",
        name: "categories",
        component:()=>import("../views/categories.vue")
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("../views/adminManage"),
        redirect: '/',
        children: [
            {path: "/", name: "index", component: () => import("../views/adminIndex")},
            {path: "categories", name: "categories", component: () => import("../views/adminManageCategories")},
            {path: "goods", name: "goods", component: () => import("../views/adminManageGoods.vue")}
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
