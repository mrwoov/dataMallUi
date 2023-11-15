import request from '@/utils/request'
import store from "@/store";

let baseurl = "/order/"
let token = store.state.token
let headers = {
    token: token
}
//分页查询订单
export const page = (data, pageSize, pageNum) => {
    return request({
        url: baseurl + "admin/page?pageNum=" + pageNum + "&pageSize=" + pageSize, method: "post", headers: headers, data
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
//管理员获取单个订单信息
export const adminGetOrderDetail = (id) => {
    return request({
        url: baseurl + "admin/" + id, method: "get", headers
    })
}