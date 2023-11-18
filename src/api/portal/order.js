import request from '@/utils/request'
import store from "@/store";

let baseurl = "order/order/"
let token = store.state.token
let headers = {
    token: token
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