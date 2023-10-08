import router from "@/router/index";

export const setRouter = () => {
    router.addRoute(name = 'admin', {
        path: "admin/", name: "admin_index", component: () => import("../views/admin/adminIndex.vue")
    })
    router.addRoute(name = 'admin', {
        path: "categories",
        name: "admin_categories",
        component: () => import("../views/admin/adminManageCategories.vue")
    })
    router.addRoute(name = 'admin', {
        path: "goods", name: "admin_goods", component: () => import("../views/admin/adminManageGoods.vue")
    },)
    router.addRoute(name = 'admin', {
        path: "admins", name: "admin_admin", component: () => import("@/views/admin/adminManageAdmin.vue")
    })
    router.addRoute(name = 'admin', {
        path: "role", name: "admin_role", component: () => import("../views/admin/adminManageRole.vue")
    })
    router.addRoute(name = 'admin', {
        path: "auth", name: "admin_auth", component: () => import("../views/admin/adminManageAuth.vue")
    })
}