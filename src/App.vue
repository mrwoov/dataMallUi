<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import BasicLayout from '@/layouts/BasicLayout.vue'

const route = useRoute()

const layout = computed(() => {
  return route.path.startsWith('/admin') ? AdminLayout : BasicLayout
})
</script>
