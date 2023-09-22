import request from '@/utils/request'
import store from "@/store";

let baseurl = "/goodsComment"
let token = store.state.token
let headers = {
    token: token
}
export const send = (goods_id, message) => {
    return request({
        url: baseurl + "/send",
        method: "post",
        headers: headers,
        data: {
            goodsId: goods_id,
            message: message
        }
    })
}
export const del = (comment_id) => {
    return request({
        url: baseurl + "/del?commentId" + comment_id,
        method: "delete",
        headers: headers
    })
}

export const get = (goods_id,page_num) => {
    return request({
        url: baseurl + "/?goodsId="+goods_id+"&pageNum="+page_num+"&pageSize=10",
        method: "get"
    })
}