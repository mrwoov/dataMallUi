<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
        <template v-for="item in menuList" :key="item.id">
          <template v-if="item.child?.length">
            <a-sub-menu :key="String(item.id)">
              <template #title>
                <span>{{ item.description }}</span>
              </template>
              <template v-for="subItem in item.child" :key="subItem.id">
                <a-menu-item>
                  <router-link :to="'/admin/' + subItem.path">
                    <component :is="getIconComponent(subItem.icon)" style="margin-right: 8px" />
                    <span>{{ subItem.description }}</span>
                  </router-link>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
          <a-menu-item v-else :key="String(item.id)">
            <router-link :to="'/admin/' + item.path">
              <component :is="getIconComponent(item.icon)" style="margin-right: 8px" />
              <span>{{ item.description }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 16px; display: flex; align-items: center;">
        <a-breadcrumb>
          <a-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
            <router-link :to="item.path">{{ item.description }}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </a-layout-header>

      <a-layout-content style="margin: 0 16px">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import type { Component } from 'vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import * as Icons from '@ant-design/icons-vue'
import request from '@/request.ts'

interface MenuItem {
  id: number
  path: string | null
  name: string | null
  parentId: number
  pagePath: string | null
  icon: string
  description: string
  createTime: string
  updateTime: string | null
  child: MenuItem[]
}

const route = useRoute()
const collapsed = ref(false)
const selectedKeys = ref<string[]>([])
const menuList = ref<MenuItem[]>([])
const breadcrumbList = ref<MenuItem[]>([])

const getIconComponent = (iconName: string): Component => {
  return Icons[iconName] || Icons.QuestionOutlined
}

const updateSelectedKeys = () => {
  const findKey = (items: MenuItem[]): MenuItem[] | undefined => {
    for (const item of items) {
      if ('/admin/' + item.path === route.path) return [item]
      if (item.child?.length) {
        const found = findKey(item.child)
        if (found) return [item, ...found]
      }
    }
  }

  const matchedItems = findKey(menuList.value)
  if (matchedItems) {
    selectedKeys.value = [String(matchedItems[matchedItems.length - 1].id)]
    breadcrumbList.value = matchedItems
  }
}

const getMenuList = async () => {
  try {
    const res = await request.get('/admin/roles/getAuths')
    if (res.code === 200) {
      menuList.value = res.data
      updateSelectedKeys()
    }
  } catch (error) {
    console.error('获取菜单失败:', error)
  }
}

watch(() => route.path, updateSelectedKeys)

onMounted(() => {
  getMenuList()
})
</script>

<style scoped></style>
