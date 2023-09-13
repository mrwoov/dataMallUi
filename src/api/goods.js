import request from '@/utils/request'
import store from "@/store";

let baseurl = "/goods"
let token = store.state.token
let headers = {
    token: token
}
//用户上传商品
export const release = (data) => {
    return request({
        url: baseurl + "/",
        method: "patch",
        headers:headers,
        data
    })
}
//用户下架商品
export const releaseOff = (goodsId) => {
  return request({
      url: baseurl + "/release_off",
      method:"post",
      headers:headers,
      data:{
          goodsId:goodsId
      }
  })
}
