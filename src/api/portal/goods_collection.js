import request from '@/utils/request'
import store from "@/store";

let baseurl = "goods/goodsCollections/"
let token = store.state.token
let headers = {
    token: token
}
//获取用户收藏的商品
export const getUserFollow = () => {
    return request({
        url: baseurl + "get_user_follow", headers, method: "get",
    })
}
//收藏商品
export const follow = (goodsId) => {
    return request({
        url: baseurl + "follow/" + goodsId, method: "get", headers: headers
    })
}
//取消收藏商品
export const unfollow = (goodsId) => {
    return request({
        url: baseurl + "unfollow/" + goodsId, method: "get", headers: headers
    })
}
//获取商品收藏数
export const getNum = (goodsId) => {
    return request({
        url: baseurl + "get_num/" + goodsId, method: "get", headers: headers
    })
}
export const getCollectionStatus = (goodsId) => {
    return request({
        url: baseurl + "isCollection/" + goodsId, method: "get", headers: headers
    })
}