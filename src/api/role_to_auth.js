import request from '@/utils/request'
import store from "@/store";

let baseurl = "/roleToAuths"
let token = store.state.token
let headers = {
    token: token
}
// 管理员新增或修改角色权限
export const api_roleToAuth_admin_saveOrUpdate = (data) => {
    return request({
        url: baseurl + "/admin",
        method: "patch",
        headers: headers,
        data
    })
}
// 管理员删除by id 角色权限
export const api_roleToAuth_admin_del = (id) => {
    return request({
        url: baseurl + "/admin/" + id,
        method: "delete",
        headers: headers
    })
}
//管理员批量删除角色权限
export const api_roleToAuth_admin_delBatch = (ids) => {
    return request({
        url: baseurl + "/admin/del_batch",
        method: "post",
        headers: headers,
        ids
    })
}
//管理员查找单个角色权限
export const api_roleToAuth_admin_get = (id) => {
    return request({
        url: baseurl + "/admin/" + id,
        method: "get",
        headers: headers
    })
}

//管理员分页查询角色权限
export const api_roleToAuth_admin_queryPage = (role_name, auth_name, page_size, page_num) => {
    return request({
        url: baseurl + "/admin/query?page_size=" + page_size + "&page_num=" + page_num,
        method: "post",
        headers: headers,
        data: {
            roleName: role_name,
            authName: auth_name,
            pageNum: page_num,
            pageSize: page_size
        }
    })
}