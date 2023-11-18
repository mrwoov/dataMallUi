import request from '@/utils/request'
import store from "@/store";

let baseurl = "user/accounts/"
let token = store.state.token
let headers = {
    token: token, path: baseurl
}
//登录
export const login = (data) => {
    return request({
        url: baseurl + "login", method: "post", data
    })
}
//校验token
export const checkToken = () => {
    return request({
        url: baseurl + "token", method: "get", headers: headers
    })
}

//用户注册
export const reg = (code, username, password, email) => {
    return request({
        url: baseurl + "reg/" + code, method: "post", data: {
            username: username, password: password, email: email
        }
    })
}
//用户忘记密码发送验证码
export const forgetSendCode = (email) => {
    return request({
        url: baseurl + "/forget/send_code/" + email, method: "get"
    })
}
//忘记密码重置
export const forget = (code, email, password) => {
    return request({
        url: baseurl + "/forget/" + code, method: "post", data: {
            email: email, password: password
        }
    })
}