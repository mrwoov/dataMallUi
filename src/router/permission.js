import router, {setRoutes} from '@/router/index'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
// 导航守卫

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        // 判断该路由是否需要登录权限
        if (store.state.token === null) {
            // 判断本地是否存在token
            next({
                path: '/user/login'
            })
        }
    }
    console.log(store.state.dynamicRoutes)
    if (store.state.dynamicRoutes.length === 1 && store.state.token != null) {
        let new_router = setRoutes(store.state.token)
        store.dispatch("dynamicRoutes", new_router).then(() => {
            router.addRoute(store.getters.dynamicRoutes)
            next({...to, replace: true})
        })
    }
    next()
})

router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
})