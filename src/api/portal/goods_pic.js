import request from '@/utils/request'
import store from "@/store";

let baseurl = "goods/goodsPic"
let token = store.state.token
let headers = {
    token: token
}
export const add = (data) => {
    return request({
        url: baseurl + "/", method: "patch", headers: headers, data
    })
}
export const del = (pic_id) => {
    return request({
        url: baseurl + "/?picId=" + pic_id, method: "delete", headers: headers
    })
}

export const admin_freeze = (pic_id) => {
    return request({
        url: baseurl + "/admin?picId=" + pic_id, method: "get", headers: headers
    })
}

export const get_list = (goodsId) => {
    return request({
        url: baseurl + "/" + goodsId, method: "get"
    })
}