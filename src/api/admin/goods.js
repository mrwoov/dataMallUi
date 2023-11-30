import request from '@/utils/request'
import store from "@/store";

let baseurl = "admin/goods"
let token = store.state.token
let headers = {
    token: token
}
//修改商品是否首页轮播图展示
export const changeGoodsPortalShow = (goodsId, state) => {
    return request({
        url: baseurl + "/changeGoodsPortalShow", method: "post", headers, data: {
            id: goodsId, showPortal: state
        },

    })
}
//审核商品
export const audit = (goodsId, state) => {
    return request({
        url: baseurl + "/audit?goodsId=" + goodsId + "&state=" + state, method: "get", headers
    })
}
//获取未审核商品
export const get_not_audit = () => {
    return request({
        url: baseurl + "/get_not_audit", method: "get", headers: headers,
    })
}
//管理员冻结解冻商品
export const admin_freeze = (data) => {
    return request({
        url: baseurl + "/admin/freeze", method: "post", headers: headers, data: data
    })
}
//管理员分页查询商品列表
export const admin_page = (data, pageSize, pageNum) => {
    return request({
        url: baseurl + "/admin/page?pageSize=" + pageSize + "&pageNum=" + pageNum,
        method: "post",
        headers: headers,
        data: data
    })
}