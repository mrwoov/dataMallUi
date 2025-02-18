// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /admin/roles/admin */
export async function getList(options?: { [key: string]: any }) {
  return request<API.BaseResponseListRole>('/admin/roles/admin', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /admin/roles/admin */
export async function save1(body: API.Role, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/roles/admin', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/roles/admin/${param0} */
export async function findOne1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOne1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseRole>(`/admin/roles/admin/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /admin/roles/admin/${param0} */
export async function delete2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete2Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/admin/roles/admin/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/roles/admin/del_batch */
export async function deleteBatch2(body: number[], options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/roles/admin/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/roles/admin/query */
export async function findPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPageParams,
  body: API.Role,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseIPageRole>('/admin/roles/admin/query', {
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

/** 此处后端没有提供注释 GET /admin/roles/getAuthList */
export async function getAuthList(options?: { [key: string]: any }) {
  return request<API.BaseResponseListAuth>('/admin/roles/getAuthList', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/roles/getAuths */
export async function getAuths(options?: { [key: string]: any }) {
  return request<API.BaseResponseListAuth>('/admin/roles/getAuths', {
    method: 'GET',
    ...(options || {}),
  })
}
