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
      <div>
        <img src="@/assets/beian.png" style="width: 15px" />
        <a href="https://beian.mps.gov.cn/#/query/webSearch?code=50009802002688" rel="noreferrer" target="_blank">渝公网安备50009802002688号</a>
      </div>
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
