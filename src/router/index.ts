import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frontHome',
      component: () => import('../views/FrontHome.vue'),
    },
    {
      path: '/user',
      children: [
        {
          path: 'login',
          name: 'userLogin',
          component: () => import('../views/UserLogin.vue'),
        },
        {
          path: 'reg',
          name: 'userReg',
          component: () => import('../views/UserReg.vue'),
        },
        {
          path: 'forget',
          name: 'userForget',
          component: () => import('../views/UserForget.vue'),
        },
        {
          path: 'bind',
          name: 'userBind',
          component: () => import('../views/UserBind.vue'),
        },
        {
          path: ':uid',
          name: 'userCenter',
          component: () => import('../views/UserCenter.vue'),
        },
      ],
    },
    {
      path: '/goods',
      children: [
        {
          path: '',
          name: 'goodsPage',
          component: () => import('../views/GoodsHomePage.vue'),
        },
        {
          path: ':goodsId',
          name: 'goodsDetail',
          component: () => import('../views/GoodsDetail.vue'),
        },
      ],
    },
    {
      path: '/excel',
      children: [
        {
          path: 'header/edit/:appid',
          name: 'excelHeaderEdit',
          component: () => import('../views/ExcelHeaderEdit.vue'),
        },
        {
          path: ':appid',
          name: 'excelPage',
          component: () => import('../views/ExcelAppDetail.vue'),
        },
      ],
    },
    {
      path: '/blog',
      children: [
        {
          path: '',
          name: 'blogPage',
          component: () => import('../views/BlogHomePage.vue'),
        },
        {
          path: ':blogId',
          name: 'blogDetail',
          component: () => import('../views/BlogDetail.vue'),
        },
      ],
    },
    {
      path: '/push',
      children: [
        {
          path: 'blog',
          name: 'pushBlog',
          component: () => import('../views/PushBlog.vue'),
        },
        {
          path: 'file',
          name: 'pushFile',
          component: () => import('../views/PushFile.vue'),
        },
        {
          path: 'excel',
          name: 'pushExcel',
          component: () => import('../views/PushExcel.vue'),
        },
      ],
    },
    {
      path: '/order',
      children: [
        {
          path: 'submit',
          name: 'orderSubmit',
          component: () => import('../views/OrderSubmit.vue'),
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue'),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/Help.vue'),
    },
  ],
})
export default router
