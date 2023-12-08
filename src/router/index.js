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
    }, {
        path: "/goods_release", name: "goodsRelease", component: () => import("@/views/user/goodsRelease.vue")
    }, {
        path: "/submit_order", name: "submitOrder", component: () => import("@/views/portal/submitOrder.vue")
    }, {
        path: "/pay_success", name: "paySuccess", component: () => import("@/views/portal/paySuccess.vue")
    }, {
        path: "/user_center/:username", name: "userCenter", component: () => import("@/views/user/personalCenter.vue")
    }, {
        path: "/user/order", name: "myOrder", component: () => import("@/views/user/myOrder.vue")
    }, {
        path: "/user/collection",
        name: "myCollection",
        component: () => import("@/views/user/myCollection.vue")
    }, {path: "/user/reg", name: "user_reg", component: () => import("@/views/portal/reg.vue")}
        , {path: "/user/forget", name: "user_forget", component: () => import("@/views/portal/forget.vue")}]
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
        path: "admins", name: "admin_admin", component: () => import("../views/admin/adminManageAdmin.vue")
    }, {path: "roles", name: "admin_role", component: () => import("../views/admin/adminManageRole.vue")}, {
        path: "auths", name: "admin_auth", component: () => import("../views/admin/adminManageAuth.vue")
    }, {
        path: "goods_audit",
        name: "admin_goods_audit",
        component: () => import("../views/admin/adminManageGoodsAudit.vue")
    }, {
        path: "system_icon", name: "admin_system_icon", component: () => import("../views/admin/systemIcon.vue")
    }, {
        path: "system_config", name: "admin_system_config", component: () => import("../views/admin/systemConfig.vue")
    }, {
        path: "orders", name: "admin_order", component: () => import("../views/admin/adminManageOrder.vue")
    }, {
        path: "orders_detail",
        name: "admin_order_detail",
        component: () => import("../views/admin/adminOrderDetail.vue")
    }]
}]

let router = new VueRouter({
    mode: 'history', base: process.env.BASE_URL, routes
})
export default router
