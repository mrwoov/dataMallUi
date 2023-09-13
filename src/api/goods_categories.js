import request from '@/utils/request'
import store from "@/store";

let baseurl = "/goodsCategories"
let token = store.state.token
let headers = {
    token: token
}
//管理员创建或修改商品分类
export const admin_saveOrUpdate = (data) => {
    return request({
        url: baseurl + "/admin",
        method: "patch",
        headers: headers,
        data
    })
}
//管理员删除商品分类
export const admin_del = (id) => {
    return request({
        url: baseurl + "/admin/" + id,
        method: "delete",
        headers: headers
    })
}
//管理员批量删除商品分类
export const admin_delBatch = (ids) => {
    return request({
        url: baseurl + "/admin/del_batch",
        method: "post",
        headers: headers,
        data: ids,
    })
}
//管理员分页查询商品分类
export const admin_query = (data, page_data) => {
    return request({
        url: baseurl + "/admin/query?pageNum=" + page_data.pageNum + "&pageSize=" + page_data.pageSize,
        method: "post",
        headers: headers,
        data: {
            name: data.name,
            url: data.url
        }
    })
}