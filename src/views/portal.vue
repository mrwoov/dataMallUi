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
  methods: {}
}
</script>

<style>

</style>