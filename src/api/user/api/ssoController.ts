// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /user/sso */
export async function findAll(options?: { [key: string]: any }) {
  return request<API.Sso[]>('/user/sso', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /user/sso/ */
export async function saveOrUpdate1(body: API.Sso, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/user/sso/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/sso/${param0} */
export async function findOne1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOne1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.Sso[]>(`/user/sso/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /user/sso/${param0} */
export async function delete1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<boolean>(`/user/sso/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /user/sso/del_batch */
export async function deleteBatch1(body: number[], options?: { [key: string]: any }) {
  return request<boolean>('/user/sso/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/sso/page */
export async function findPage1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPage1Params,
  options?: { [key: string]: any }
) {
  return request<API.PageSso>('/user/sso/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
