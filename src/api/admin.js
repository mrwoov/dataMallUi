import request from '@/utils/request'
import store from "@/store";

let baseurl = "/admins/"
let token = store.state.token
let headers = {
    token: token
}
export const saveOrUpdate = (data) => {
    return request({
        headers: headers,
        url: baseurl,
        method: "patch",
        data
    })
}
export const del = (id) => {
    return request({
        headers: headers,
        url: baseurl + id,
        method: "delete"
    })
}
export const del_batch = (ids) => {
    return request({
        headers: headers,
        url: baseurl + "del_batch",
        method: "post",
        data: ids
    })
}
export const query = (data, pageSize, pageNum) => {
    return request({
        headers: headers,
        url: baseurl + "query?pageSize=" + pageSize + "&pageNum=" + pageNum,
        method: "post",
        data: data
    })
}