import request from '@/utils/request'
import store from "@/store";

let baseurl = "/order/"
let token = store.state.token
let headers = {
    token: token
}
export const submit = (data) => {
    return request({
        url: baseurl + "submit",
        method: "post",
        headers: headers,
        data
    })
}
export const check = (trade_no) => {
    return request({
        url: baseurl + "check?trade_no=" + trade_no,
        method: "get",
        headers
    })
}