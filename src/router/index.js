import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "portal",
    component: () => import("@/views/portal/portal.vue"),
    redirect: "/",
    meta: {requireAuth: false, requireAdmin: false},
    children: [{
        path: "/", name: "portal_index", component: () => import("@/views/portal/portalIndex.vue")
    }, {
        path: "/user/login", name: "user_login", component: () => import("@/views/portal/login.vue")
    }, {
        path: "/categories/:categories", name: "categories", component: () => import("@/views/portal/categories.vue")
    }, {
        path: "/goods/:goods_id", name: "goods", component: () => import("@/views/portal/goods.vue")
    }, {
        path: "/search", name: "portalGoodsSearch", component: () => import("@/views/portal/portalGoodsSearch.vue")
    },]
}, {
    path: "/admin",

    component: () => import("../views/admin/adminManage.vue"),
    meta: {requireAuth: true, requireAdmin: true},
    redirect: '/',
    children: [{
        path: "/",
        name: "admin_index",
        meta: {requireAuth: true, requireAdmin: true},
        component: () => import("../views/admin/adminIndex.vue")
    }, {
        path: "categories",
        name: "admin_categories",
        component: () => import("../views/admin/adminManageCategories.vue")
    }, {path: "goods", name: "admin_goods", component: () => import("../views/admin/adminManageGoods.vue")}, {
        path: "admins",
        name: "admin_admin",
        component: () => import("../views/admin/adminManageAdmin.vue")
    }, {path: "role", name: "admin_role", component: () => import("../views/admin/adminManageRole.vue")}, {
        path: "auth",
        name: "admin_auth",
        component: () => import("../views/admin/adminManageAuth.vue")
    }]
}]

let router = new VueRouter({
    mode: 'history', base: process.env.BASE_URL, routes
})
export default router
