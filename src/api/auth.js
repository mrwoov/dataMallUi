import request from '@/utils/request'
import store from "@/store";

let baseurl = "/auths/"
let token = store.state.token
let headers = {
    token: token
}
//管理员新增或修改
export const admin_saveOrUpdate = (data) => {
    return request({
        url: baseurl + "admin",
        method: "patch",
        headers: headers,
        data
    })
}
//管理员删除单个
export const admin_del = (id) => {
    return request({
        url: baseurl + "admin/" + id,
        method: "delete",
        headers: headers
    })
}
//管理员批量删除
export const admin_getTree = () => {
    return request({
        url: baseurl + "admin",
        method: "get",
        headers: headers
    })
}
