<template>
  <div id="frontHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <router-link to="/">
          <div class="title-bar">
            <img alt="logo" class="logo" src="../assets/logo.svg" />
            <div class="title">DataMall</div>
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          :items="items"
          class="menu"
          mode="horizontal"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="400px">
        <div class="option-bar">
          <div v-if="inSearchPage" class="search-bar">
            <a-input-search
              v-model:value="search_key"
              enter-button
              placeholder="发现资源"
              @search="onSearch"
            />
          </div>
          <div class="publish-button">
            <a-dropdown>
              <template #overlay>
                <a-menu slot="overlay" @click="publishTypeMenuClick">
                  <a-menu-item key="1">
                    <a href="/push/file">发布文件</a>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a href="/push/excel">发布API</a>
                  </a-menu-item>
                  <a-menu-item key="3">
                    <a href="/push/blog">发布博客</a>
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button type="primary"> 发布</a-button>
            </a-dropdown>
          </div>
          <div class="user-login-status">
            <div v-if="loginUser.loginUser.token !== ''">
              <a-dropdown>
                <template #overlay>
                  <a-menu slot="overlay">
                    <a-menu-item key="1">
                      <a :href="userCenterLink()">个人中心</a>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a href="/order">我的订单</a>
                    </a-menu-item>
                    <a-menu-item key="3" @click="logout">退出登录</a-menu-item>
                    <!-- 修改处：只要是管理员，都显示后台入口；如果后台地址还未获取，则显示加载中状态 -->
                    <a-menu-item
                      v-if="loginUser.loginUser.token !== '' && loginUser.loginUser.admin"
                      key="4"
                    >
                      <template v-if="adminPath">
                        <a :href="adminPath">后台管理</a>
                      </template>
                      <template v-else>
                        <a href="javascript:void(0)" @click="getAdminPath">
                          后台管理 (加载中...)
                        </a>
                      </template>
                    </a-menu-item>
                  </a-menu>
                </template>
                <a-avatar
                  :size="40"
                  :src="loginUser.loginUser.avatar"
                  :srcset="loginUser.loginUser.avatar"
                />
              </a-dropdown>
            </div>
            <div v-else>
              <a-button href="/user/login">登录</a-button>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { MenuProps } from 'ant-design-vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'
import request from '@/request.ts'

const adminPath = ref('')
const loginUser = useLoginUserStore()

// 获取后台管理地址
const getAdminPath = () => {
  if (loginUser.loginUser.token === '' || loginUser.loginUser.admin === false) {
    return
  }
  request.get('/admin/admins/adminPath').then((res) => {
    // if (res.code === 200) {
    //   adminPath.value =
    //     'http://' +
    //     res.data +
    //     '/login?token=' +
    //     loginUser.loginUser.token +
    //     '&redirect=' +
    //     window.location.href
    // }
    if (res.code === 200) {
      adminPath.value = 'http://' + res.data + '/admin'
    }
  })
}

// 监听登录状态变化，确保管理员状态更新后及时获取后台地址
watch(
  () => loginUser.loginUser,
  (newUser) => {
    if (newUser.token && newUser.admin && adminPath.value === '') {
      getAdminPath()
    } else if (!newUser.token || !newUser.admin) {
      adminPath.value = ''
    }
  },
  { deep: true, immediate: true },
)

onMounted(() => {
  getAdminPath()
})

const userCenterLink = () => {
  return '/user/' + loginUser.loginUser.account_id
}

const items = ref<MenuProps['items']>([
  {
    key: '/',
    label: '主页',
    title: '主页',
  },
  {
    key: '/goods',
    label: '文件数据',
    title: '文件数据',
  },
  {
    key: '/excel',
    label: 'API数据',
    title: 'API数据',
  },
  {
    key: '/blog',
    label: '博客',
    title: '博客',
  },
  {
    key: '/help',
    label: '帮助中心',
    title: '帮助中心',
  },
])
const router = useRouter()
const inSearchPage = ref<boolean>(true)
watch(router.currentRoute, () => {
  inSearchPage.value = router.currentRoute.value.path !== '/search'
})
inSearchPage.value = router.currentRoute.value.path !== '/search'

// 路由跳转事件
const doMenuClick = ({ key }: { key: string }): void => {
  router.push({
    path: key,
  })
}

// 当前选中的菜单项
const current = ref<string[]>([])
// 监听路由变化, 更新当前选中的菜单项
router.afterEach((to) => {
  current.value = [to.path]
})

const search_key = ref<string>('')
const onSearch = (value: string) => {
  router.push({
    path: '/search',
    query: { key: value },
  })
}

const publishTypeMenuClick = ({ key }: { key: string }) => {
  console.log(key)
}

const logout = () => {
  loginUser.logout()
  router.push({
    path: '/',
  })
}
</script>

<style scoped>
#frontHeader .title-bar {
  line-height: 50px;
  display: flex;
  align-items: center;
}

#frontHeader .logo {
  height: 35px;
}

#frontHeader .title {
  color: black;
  font-size: 18px;
  margin-left: 10px;
}

#frontHeader .menu {
  line-height: 50px;
}

#frontHeader .option-bar {
  display: flex;
  justify-content: flex-end;
  line-height: 50px;
  align-items: center;
  vertical-align: center;
  text-align: center;
}

#frontHeader .publish-button {
  margin: 0 10px;
}

#frontHeader .search-bar {
  margin: 0 10px;
  display: flex;
  align-items: center;
}

/* 如需要可以增加禁用链接的样式 */
.disabled-link {
  pointer-events: none;
  opacity: 0.6;
}
</style>
