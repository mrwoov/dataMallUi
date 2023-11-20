import request from '@/utils/request'
import store from "@/store";

let baseurl = "goods/goodsFiles"
let token = store.state.token
let headers = {
    token: token
}
export const download = (md5) => {
    return request({
        url: baseurl + "/download/" + md5,
        method: "get",
    })
}