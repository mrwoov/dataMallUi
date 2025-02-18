<template>
  <div id="goodsListItem">
    <a-card class="card">
      <a :href="card_link(props.item.id)" class="card-link">
        <div class="img-box">
          <img :src="props.item.picIndex" alt="" class="image" style="width: 300px; height: 200px" />
        </div>
        <div style="padding: 14px">
          <span>{{ props.item.name }}</span>
          <br />
          <span class="item-price">￥{{ props.item.money }}</span>
          <br />
          <span class="collection -num">{{ props.item.collection }}人想要</span>
          <br />
          <span class="owner-username">
            <a-avatar :src="props.item.avatar" alt="" class="avatar-img" />
            <a :href="user_link(item.uid)" class="username">{{ props.item.username }}</a>
          </span>
        </div>
      </a>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  item: any
}>()
const card_link = (id: number) => {
  return window.document.location.origin + '/goods/' + id
}
const user_link = (id: number) => {
  return window.document.location.origin + '/user/' + id
}
</script>
<style scoped>
#goodsListItem .card{
}
#goodsListItem .card-link{
  color: black;
}
#goodsListItem .image{
  width: 100%;
  height: 200px;
}
#goodsListItem .img-box{
  text-align: center;
  width: 100%;
}
</style>
