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
          path: '',
          name: 'excelHomePage',
          component: () => import('../views/ExcelAppHomePage.vue'),
        },
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
          path: '',
          name: 'orderPage',
          component: () => import('../views/Order.vue'),
        },
        {
          path: 'submit',
          name: 'orderSubmit',
          component: () => import('../views/OrderSubmit.vue'),
        },
        {
          path: 'pay_success',
          name: 'paySuccess',
          component: () => import('../views/OrderPaySuccess.vue'),
        },
      ],
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
    {
      path: '/admin',
      name: 'admin',
      children: [
        {
          path: '',
          name: 'adminHome',
          component: () => import('../views/AdminIndex.vue'),
        },
        {
          path: 'admins',
          name: 'manageAdmins',
          component: () => import('../views/ManageAdmin.vue'),
        },
        {
          path: 'roles',
          name: 'manageRoles',
          component: () => import('../views/ManageRole.vue'),
        },
        {
          path: 'auths',
          name: 'manageAuth',
          component: () => import('../views/ManageAuth.vue'),
        },
        {
          path: 'users',
          name: 'manageUsers',
          component: () => import('../views/ManageUser.vue'),
        },
        {
          path: 'goods',
          name: 'manageGoods',
          component: () => import('../views/ManageGoods.vue'),
        },
        {
          path: 'goods_categories',
          name: 'manageGoodsCategories',
          component: () => import('../views/ManageGoodsCategory.vue'),
        },
        {
          path: 'orders',
          name: 'manageOrders',
          component: () => import('../views/ManageOrder.vue'),
        },
        {
          path: 'excel_apps',
          name: 'manageExcelApps',
          component: () => import('../views/ManageExcelApp.vue'),
        },
        {
          name: 'manageBlog',
          path: 'blogs',
          component: () => import('../views/ManageBlog.vue'),
        },
        {
          name: 'manageCustomer',
          path: 'customers',
          component: () => import('../views/ManageCustomer.vue'),
        },
        {
          name: 'manageCarousel',
          path: 'carousels',
          component: () => import('../views/ManageCarousel.vue'),
        },
      ],
    },
  ],
})
export default router
