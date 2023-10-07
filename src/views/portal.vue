<template>
  <div>
    <portal-header/>
    <router-view/>
  </div>
</template>
<script>
import PortalHeader from "@/components/portalHeader.vue";

export default {
  name: "portal",
  components: {PortalHeader},
  data() {
    return {}
  },
  created() {

  },
  watch: {
    $route(to, from) {
      // to表示要跳转的路由，from表示从哪儿跳的路由   to.path
      this.$router.go(0)
    },
  },
  methods: {}
}
</script>

<style>

</style>