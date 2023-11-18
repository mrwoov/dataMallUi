import request from '@/utils/request'
import store from "@/store";

let baseurl = "admin/order/"
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
//管理员获取单个订单信息
export const adminGetOrderDetail = (id) => {
    return request({
        url: baseurl + "admin/" + id, method: "get", headers
    })
}