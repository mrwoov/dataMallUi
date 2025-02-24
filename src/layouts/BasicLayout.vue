<template>
<div id="basicLayout">
  <a-layout style="min-height: 100vh">
    <a-layout-header class="header">
      <FrontHeader />
    </a-layout-header>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
    <a-layout-footer class="footer">
      dataMall ©2025 Created by woov
    </a-layout-footer>
  </a-layout>
</div>
</template>
<script setup lang="ts">
import FrontHeader from '@/components/FrontHeader.vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore.ts'

const loginUser = useLoginUserStore()
loginUser.checkUserTokenNoGoLogin()
</script>

<style scoped>
#basicLayout .header {
  padding-inline: 20px;
  background: #fff;
  color: unset;
  margin-bottom: 10px;
  height: 50px;
}
#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
  padding: 20px;
}
#basicLayout .footer {
  background: #fff;
  text-align: center;
}
</style>
