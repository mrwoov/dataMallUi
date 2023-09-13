import request from '@/utils/request'
import store from "@/store";

let baseurl = "/users/"
let token = store.state.token
let headers = {
    token: token
}
//登录
export const api_user_login = (data) => {
    return request({
        url: baseurl + "login",
        method: "post",
        data
    })
}
//校验token
export const api_user_checkToken = () => {
    return request({
        url: baseurl + "token",
        method: "get",
        headers: headers
    })
}
//管理员新增或修改用户
export const api_user_admin_saveOrUpdate = (data) => {
    return request({
        url: baseurl + "admin",
        method: "patch",
        headers: headers,
        data
    })
}
//管理员删除用户
export const api_user_admin_del = (id) => {
    return request({
        url: baseurl + "admin/" + id,
        method: "delete",
        headers: headers,
    })
}
//管理员批量删除用户
export const api_user_admin_delBatch = (ids) => {
    return request({
        url: baseurl + "admin/del_batch",
        method: "post",
        headers:headers,
        ids
    })
}
//管理员分页查
export const api_user_admin_queryPage = (username, email, page_num, page_size) => {
    return request({
        url: baseurl + "admin/query?pageNum=" + page_num + "&pageSize=" + page_size,
        method: "post",
        headers:headers,
        data: {
            userName: username,
            email: email
        }
    })
}

//管理员查单个id信息
export const api_user_admin_get = (id) => {
    return request({
        url: baseurl + "admin/" + id,
        method: "get",
        headers:headers
    })
}
//用户注册-发验证码
export const api_user_regSendCode = (email) => {
    return request({
        url: baseurl + "reg/send_code/" + email,
        method: "get"
    })
}
//用户注册
export const api_user_reg = (code, username, password, email) => {
    return request({
        url: baseurl + "reg/" + code,
        method: "post",
        data: {
            userName: username,
            passWord: password,
            email: email
        }
    })
}
//用户忘记密码发送验证码
export const api_user_forgetSendCode = (email) => {
    return request({
        url: baseurl + "/forget/send_code/" + email,
        method: "get"
    })
}
//忘记密码重置
export const api_user_forget = (code, email, password) => {
    return request({
        url: baseurl + "/forget/" + code,
        method: "post",
        data: {
            email: email,
            passWord: password
        }
    })
}