import request from '@/utils/request'
import store from "@/store";

let baseurl = "/goods"
let token = store.state.token
let headers = {
    token: token
}
//用户上传商品
export const release = (data) => {
    return request({
        url: baseurl + "/",
        method: "post",
        headers: {
            "Content-Type": "multipart/form-data",
            token: token,
        },
        data: data
    })
}
//用户下架商品
export const releaseOff = (goodsId) => {
    return request({
        url: baseurl + "/release_off",
        method: "post",
        headers: headers,
        data: {
            goodsId: goodsId
        }
    })
}

//用户上架商品
export const releaseOn = (goodsId) => {
    return request({
        url: baseurl + "/release_on",
        method: "post",
        headers: headers,
        data: {
            goodsId: goodsId
        }
    })
}
//用户删除商品
export const del = (goodsId) => {
    return request({
        url: baseurl + "/",
        method: "delete",
        headers: headers,
        data: {
            goodsId: goodsId
        }
    })
}

//管理员冻结商品
export const admin_freeze = (goodsId) => {
    return request({
        url: baseurl + "/admin/freeze?goodsId="+goodsId,
        method: "post",
        headers: headers,
    })
}
//管理员解冻商品
export const admin_unfreeze = (goodsId) => {
    return request({
        url: baseurl + "/admin/unfreeze?goodsId="+goodsId,
        method: "post",
        headers: headers
    })
}
//游客获取单个商品信息
export const getInfo = (goodsId) => {
    return request({
        url: baseurl + "/info/" + goodsId,
        method: "get"
    })
}
//管理员分页查询商品列表
export const admin_page = (data, pageSize, pageNum) => {
    return request({
        url: baseurl + "/admin/page?pageSize=" + pageSize + "&pageNum=" + pageNum,
        method: "post",
        headers: headers,
        data: data
    })
}
//查询单个用户发布的发布的商品列表
export const list = (uid) => {
    return request({
        url: baseurl + "/list/" + uid,
        method: "get",
    })
}

//用户修改商品信息
export const update = (data) => {
    return request({
        url: baseurl + "/update",
        method: "post",
        headers: headers,
        data: data
    })
}
//搜索商品
export const search = (keyword) =>{
    return request({
        url:baseurl+"/search",
        method:"get",
        params:{
            keyword:keyword
        }
    })
}
//查看分类下商品
export const categoriesGoods = (categories_name)=>{
    return request({
        url:baseurl+"/categories?categories="+categories_name,
        method:"get",
    })
}