import request from '@/utils/request'
import store from "@/store";

let baseurl = "goods/goodsCategories"
let token = store.state.token
let headers = {
    token: token
}

//查询商品分类list
export const getList = () => {
    return request({
        url: baseurl + "/",
        method: "get"
    })
}