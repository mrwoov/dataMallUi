import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "portal",
    component: () => import("../views/portal.vue"),
    redirect: "/",
    meta: {requireAuth: false, requireAdmin: false},
    children: [{
        path: "/", name: "portal_index", component: () => import("../views/portalIndex.vue")
    }, {
        path: "/user/login", name: "user_login", component: () => import("../views/login.vue")
    }, {
        path: "/categories/:categories", name: "categories", component: () => import("../views/categories.vue")
    }, {
        path: "/goods/:goods_id", name: "goods", component: () => import("../views/goods.vue")
    }, {
        path: "/search", name: "portalGoodsSearch", component: () => import("../views/portalGoodsSearch.vue")
    },]
}, {
    path: "/admin",

    component: () => import("../views/adminManage"),
    meta: {requireAuth: true, requireAdmin: true},
    redirect: '/',
    children: [{
        path: "/",
        name: "admin_index",
        meta: {requireAuth: true, requireAdmin: true},
        component: () => import("../views/adminIndex")
    }, {
        path: "categories",
        name: "admin_categories",
        component: () => import("../views/adminManageCategories")
    }, {path: "goods", name: "admin_goods", component: () => import("../views/adminManageGoods")}, {
        path: "admins",
        name: "admin_admin",
        component: () => import("../views/adminManageAdmin")
    }, {path: "role", name: "admin_role", component: () => import("../views/adminManageRole")}, {
        path: "auth",
        name: "admin_auth",
        component: () => import("../views/adminManageAuth")
    }]
}]

let router = new VueRouter({
    mode: 'history', base: process.env.BASE_URL, routes
})
export default router
