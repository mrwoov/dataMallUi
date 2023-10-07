import Vue from 'vue'
import VueRouter from 'vue-router'
import * as api_role from "@/api/role";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "portal",
        component: () => import("../views/portal.vue"),
        redirect: "/",
        meta: {requireAuth: false, requireAdmin: false},
        children: [
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
                path: "/categories/:categories",
                name: "categories",
                component: () => import("../views/categories.vue")
            },
            {
                path: "/goods/:goods_id",
                name: "goods",
                component: () => import("../views/goods.vue")
            },
            {
                path: "/search",
                name: "portalGoodsSearch",
                component: () => import("../views/portalGoodsSearch.vue")
            },
        ]
    }
]

let router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
// router.addRoute( {
//     path: "/admin",
//     name: "admin",
//     component: () => import("../views/adminManage"),
//     redirect: '/',
//     meta: {requireAuth: true, requireAdmin: true},
//     children: [
//         {
//             path: "/admin",
//             name: "admin_index",
//             meta: {requireAuth: true, requireAdmin: true},
//             component: () => import("../views/adminIndex")
//         },
//         {path: "categories", name: "admin_categories", component: () => import("../views/adminManageCategories")},
//         {path: "goods", name: "admin_goods", component: () => import("../views/adminManageGoods")},
//         {path: "admin", name: "admin_admin", component: () => import("../views/adminManageAdmin")},
//         {path: "role", name: "admin_role", component: () => import("../views/adminManageRole")},
//         {path: "auth", name: "admin_auth", component: () => import("../views/adminManageAuth")}
//     ]
// })
export const setRoutes = (token) => {
    api_role.get_authList(token).then(res => {
        const auths = res.data
        let manageRoute = {
            path: "/admin",
            name: "admin",
            component: () => import("@/views/adminManage"),
            redirect: '/',
            meta: {requireAuth: false, requireAdmin: false},
            children: []
        }
        auths.forEach(item => {
            if (item.path !== '') {
                let page = "@/views/" + item.pagePath
                manageRoute.children.push({
                    path: item.path,
                    name: item.name,
                    component: (resolve) => require([`@/view${item.pagePath}`], resolve)
                })
            }
        })
        router.addRoute(manageRoute)
        router.options.routes.push(manageRoute)
        return manageRoute
    })
    return router.options.routes
}
export default router
