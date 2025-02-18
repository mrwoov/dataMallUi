<template>
  <div id="goodsList">
    <a-list :grid="{ gutter: 16, column: 4 }" :data-source="props.goodsList">
      <template #renderItem="{ item }">
        <a-list-item>
          <GoodsListItem  :item="item"/>
        </a-list-item>
      </template>
    </a-list>
  </div>

</template>
<script lang="ts" setup>
import GoodsListItem from '@/components/GoodsListItem.vue'
const props = defineProps<{
  goodsList: any,
}>()


</script>
<style scoped>

</style>
