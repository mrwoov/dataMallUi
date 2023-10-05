import request from '@/utils/request'
import store from "@/store";

let baseurl = "/roles/"
let token = store.state.token
let headers = {
    token: token
}
export const get_list = () => {
    return request({
        headers: headers,
        url: baseurl + "/admin",
        method: "get"
    })
}