// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 POST /admin/roleToAuths/admin */
export async function save(body: API.RoleToAuth, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/roleToAuths/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/roleToAuths/admin/${param0} */
export async function findOne2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOne2Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseRoleToAuth>(`/admin/roleToAuths/admin/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /admin/roleToAuths/admin/${param0} */
export async function delete3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete3Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/admin/roleToAuths/admin/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/roleToAuths/admin/del_batch */
export async function deleteBatch3(body: number[], options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/roleToAuths/admin/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/roleToAuths/admin/query */
export async function findPage1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPage1Params,
  body: API.RoleToAuth,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseIPageRoleToAuth>('/admin/roleToAuths/admin/query', {
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
