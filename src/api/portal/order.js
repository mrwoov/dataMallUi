import request from '@/utils/request'
import store from "@/store";

let baseurl = "order/order/"
let token = store.state.token
let headers = {
    token: token
}
//关闭订单
export const close = (trade_no) => {
    return request({
        url: baseurl + "close?trade_no=" + trade_no,
        method: "get",
        headers
    })
}
//下载订单资源
export const downloadGoods = (orderId) => {
    return request({
        url: baseurl + "download/" + orderId,
        method: "get",
        headers
    })
}
//提交订单
export const submit = (data) => {
    return request({
        url: baseurl + "submit", method: "post", headers: headers, data
    })
}
//检查支付状态
export const check = (trade_no) => {
    return request({
        url: baseurl + "check?trade_no=" + trade_no, method: "get", headers
    })
}
//获取用户全部订单
export const getUserAllOrder = () => {
    return request({
        url: baseurl + "user_get_all", method: "get", headers: headers
    })
}
//获取用户未支付订单
export const getUserNoPayOrder = () => {
    return request({
        url: baseurl + "user_get_noPay", method: "get", headers: headers
    })
}
//获取用户已购买订单
export const getUserBuyOrder = () => {
    return request({
        url: baseurl + "user_get_buy", method: "get", headers: headers
    })
}
//用户分页获取订单
export const userPage = (pageNum, pageSize, data) => {
    return request({
        url: baseurl + "user/page?pageSize=" + pageSize + "&pageNum=" + pageNum, method: "post", headers, data
    })
}