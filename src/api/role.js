import request from '@/utils/request'
import store from "@/store";

let baseurl = "/roles/"
let token = store.state.token
let headers = {
    token: token
}
//管理员新增或保存
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
export const admin_delBatch = (ids) => {
    return request({
        url: baseurl + "admin/del_batch",
        method: "post",
        headers: headers,
        data: ids
    })
}
//管理员获取单个
export const admin_getOne = (id) => {
    return request({
        url: baseurl + "admin/" + id,
        method: "get",
        headers: headers
    })
}
//管理员获取角色列表
export const admin_getList = () => {
    return request({
        headers: headers,
        url: baseurl + "admin",
        method: "get"
    })
}
//管理员分页查询
export const admin_query = (data, pageNum, pageSize) => {
    return request({
        headers: headers,
        url: baseurl + "admin/query?pageNum=" + pageNum + "&pageSize=" + pageSize,
        method: "post",
        data
    })
}