// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /user/ssoType */
export async function findAll1(options?: { [key: string]: any }) {
  return request<API.SsoType[]>('/user/ssoType', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /user/ssoType/ */
export async function saveOrUpdate(body: API.SsoType, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/user/ssoType/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/ssoType/${param0} */
export async function findOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOneParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.SsoType[]>(`/user/ssoType/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /user/ssoType/${param0} */
export async function deleteUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<boolean>(`/user/ssoType/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /user/ssoType/del_batch */
export async function deleteBatch(body: number[], options?: { [key: string]: any }) {
  return request<boolean>('/user/ssoType/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/ssoType/page */
export async function findPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPageParams,
  options?: { [key: string]: any }
) {
  return request<API.PageSsoType>('/user/ssoType/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
