import request from '@/utils/request'
import store from "@/store";

let baseurl = "/admin/accounts"
let token = store.state.token
let headers = {
    token: token, path: baseurl
}
//用户分页查
export const admin_query = (username, email, page_num, page_size) => {
    return request({
        url: baseurl + "/admin/query?pageNum=" + page_num + "&pageSize=" + page_size,
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
        url: baseurl + "/admin/?" + id, method: "get", headers: headers
    })
}

//用户名模糊匹配
export const admin_query_username = (username) => {
    return request({
        url: baseurl + "/admin/getListByOption?username=" + username,
        method: "get",
        headers
    })
}