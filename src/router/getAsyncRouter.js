import router from "@/router/index";

export const setRouter = () => {
    router.addRoute(name = 'admin', {
        path: "admin/", name: "admin_index", component: () => import("../views/adminIndex")
    })
    router.addRoute(name = 'admin', {
        path: "categories", name: "admin_categories", component: () => import("../views/adminManageCategories")
    })
    router.addRoute(name = 'admin', {
        path: "goods", name: "admin_goods", component: () => import("../views/adminManageGoods")
    },)
    router.addRoute(name = 'admin', {
        path: "admins", name: "admin_admin", component: () => import("@/views/adminManageAdmin")
    })
    router.addRoute(name = 'admin', {
        path: "role", name: "admin_role", component: () => import("../views/adminManageRole")
    })
    router.addRoute(name = 'admin', {
        path: "auth", name: "admin_auth", component: () => import("../views/adminManageAuth")
    })
}