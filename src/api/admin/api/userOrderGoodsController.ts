// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /admin/userOrderGoods */
export async function findAll(options?: { [key: string]: any }) {
  return request<API.UserOrderGoods[]>('/admin/userOrderGoods', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /admin/userOrderGoods/ */
export async function saveOrUpdate(body: API.UserOrderGoods, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/userOrderGoods/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/userOrderGoods/${param0} */
export async function findOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOneParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.UserOrderGoods>(`/admin/userOrderGoods/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /admin/userOrderGoods/${param0} */
export async function deleteUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<boolean>(`/admin/userOrderGoods/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/userOrderGoods/del_batch */
export async function deleteBatch(body: number[], options?: { [key: string]: any }) {
  return request<boolean>('/admin/userOrderGoods/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/userOrderGoods/page */
export async function findPage2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPage2Params,
  options?: { [key: string]: any }
) {
  return request<API.PageUserOrderGoods>('/admin/userOrderGoods/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
