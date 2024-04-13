import request from "@/utils/request";


let baseurl = "excelApp"

export const downloadExcelData = (appId, queryOptions) => {
    return request({
        url: baseurl + "/exportData/" + appId, method: "post",
        headers: {'responseType': 'blob'},
        data: queryOptions,
    })
}
export const getExcelAppList = (params) => {
    return request({
        url: baseurl + "/listExcelApp", method: "get", params
    })
}
export const getExcelHeader = (appid) => {
    return request({
        url: baseurl + "/getHeader/" + appid, method: "get",
    })
}
export const getExcelHeaderQuery = (appid) => {
    return request({
        url: baseurl + "/getHeaderWithQuery/" + appid, method: "get",
    })

}
export const updateExcelHeader = (appId, data) => {
    return request({
        url: baseurl + "/updateHeader/" + appId, method: "post",
        data: [data]
    })
}
export const getExcelData = (appid, pageSize, pageNum, data) => {
    return request({
        url: baseurl + "/listData/" + appid + "?pageSize=" + pageSize + "&pageNum=" + pageNum,
        method: "post",
        data
    })
}
export const updateExcelData = (appid, data) => {
    return request({
        url: baseurl + "/updateData/" + appid, method: "put",
        data
    })
}
export const addExcelData = (appid, data) => {
    return request({
        url: baseurl + "/addData/" + appid, method: "post",
        data
    })
}
export const deleteExcelData = (appid, data) => {
    return request({
        url: baseurl + "/deleteData/" + appid, method: "post",
        data
    })
}
export const deleteExcelApp = (appid) => {
    return request({
        url: baseurl + "/deleteExcelApp/" + appid, method: "delete",
    })
}
export const updateExcelApp = (data) => {
    return request({
        url: baseurl + "/updateExcelApp", method: "put",
        data
    })
}