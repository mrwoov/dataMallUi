import request from '@/utils/request'
import store from "@/store";

let baseurl = "/admin"
let token = store.state.token
let headers = {
    token: token, path: baseurl
}
//管理员分页查
export const admin_query = (username, email, page_num, page_size) => {
    return request({
        url: baseurl + "admin/query?pageNum=" + page_num + "&pageSize=" + page_size,
        method: "post",
        headers: headers,
        data: {
            username: username, email: email
        }
    })
}

//管理员查单个id信息
export const admin_get = (id) => {
    return request({
        url: baseurl + "admin/" + id, method: "get", headers: headers
    })
}
//用户注册-发验证码
export const regSendCode = (email) => {
    return request({
        url: baseurl + "reg/send_code/" + email, method: "get"
    })
}