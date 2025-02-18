// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /excel/excel-app-access-key/add/${param0} */
export async function addNumToAccessKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addNumToAccessKeyParams,
  options?: { [key: string]: any }
) {
  const { orderId: param0, ...queryParams } = params
  return request<API.BaseResponse>(`/excel/excel-app-access-key/add/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /excel/excel-app-access-key/create/${param0} */
export async function createAccessKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createAccessKeyParams,
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponse>(`/excel/excel-app-access-key/create/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /excel/excel-app-access-key/reset/${param0} */
export async function resetAccessKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resetAccessKeyParams,
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponse>(`/excel/excel-app-access-key/reset/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}
