// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /admin/order */
export async function findAll2(options?: { [key: string]: any }) {
  return request<API.UserOrder[]>('/admin/order', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /admin/order/ */
export async function saveOrUpdate2(body: API.UserOrder, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/order/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /admin/order/${param0} */
export async function delete4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete4Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<boolean>(`/admin/order/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/order/admin/${param0} */
export async function findOne3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOne3Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseUserOrder>(`/admin/order/admin/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/order/admin/page */
export async function page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageParams,
  body: API.UserOrder,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseIPageUserOrder>('/admin/order/admin/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/order/del_batch */
export async function deleteBatch4(body: number[], options?: { [key: string]: any }) {
  return request<boolean>('/admin/order/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
