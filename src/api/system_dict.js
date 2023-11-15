import request from '@/utils/request'
import store from "@/store";

let baseurl = "/systemDict/"
let token = store.state.token
let headers = {
    token: token
}
export const get_icon_page = (name, value, pageSize, pageNum) => {
    return request({
        url: baseurl + "admin/icon_page?pageSize=" + pageSize + "&pageNum=" + pageNum, method: "post", headers, data: {
            name: name, value: value
        }
    })
}

export const saveOrUpdate = (data) => {
    return request({
        url: baseurl + "admin", method: "patch", headers, data: data
    })
}
export const del = (id) => {
    return request({
        url: baseurl + "admin/" + id,
        method: "delete",
        headers
    })
}