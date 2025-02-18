// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /goods/xlsxApi */
export async function findAll(options?: { [key: string]: any }) {
  return request<API.XlsxApi[]>('/goods/xlsxApi', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /goods/xlsxApi/ */
export async function saveOrUpdate(body: API.XlsxApi, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/goods/xlsxApi/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/xlsxApi/${param0} */
export async function findOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOneParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.XlsxApi[]>(`/goods/xlsxApi/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /goods/xlsxApi/${param0} */
export async function deleteUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<boolean>(`/goods/xlsxApi/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /goods/xlsxApi/del_batch */
export async function deleteBatch(body: number[], options?: { [key: string]: any }) {
  return request<boolean>('/goods/xlsxApi/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/xlsxApi/page */
export async function findPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPageParams,
  options?: { [key: string]: any }
) {
  return request<API.PageXlsxApi>('/goods/xlsxApi/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /goods/xlsxApi/upload */
export async function upload(body: {}, options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/goods/xlsxApi/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
