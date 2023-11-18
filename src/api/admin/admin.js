import request from '@/utils/request'
import store from "@/store";

let baseurl = "admin/admins/"
let token = store.state.token
let headers = {
    token: token,
}
export const admin_panel_info = () => {
    return request({
        url: baseurl + "panel", headers: headers, method: "get"
    })
}
export const admin_saveOrUpdate = (data) => {
    return request({
        headers: headers, url: baseurl, method: "patch", data
    })
}
export const admin_del = (id) => {
    return request({
        headers: headers, url: baseurl + id, method: "delete"
    })
}
export const admin_del_batch = (ids) => {
    return request({
        headers: headers, url: baseurl + "del_batch", method: "post", data: ids
    })
}
export const admin_query = (data, pageSize, pageNum) => {
    return request({
        headers: headers,
        url: baseurl + "query?pageSize=" + pageSize + "&pageNum=" + pageNum,
        method: "post",
        data: data
    })
}