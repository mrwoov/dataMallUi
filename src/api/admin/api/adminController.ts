// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 PATCH /admin/admins/ */
export async function saveOrUpdate4(body: API.Admin, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/admins/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /admin/admins/${param0} */
export async function del1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.del1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/admin/admins/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/admins/del_batch */
export async function delBatch(body: number[], options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/admins/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/admins/isAdmin */
export async function isAdmin(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.isAdminParams,
  options?: { [key: string]: any }
) {
  return request<boolean>('/admin/admins/isAdmin', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/admins/panel */
export async function panelInfo(options?: { [key: string]: any }) {
  return request<API.BaseResponseMapStringString>('/admin/admins/panel', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/admins/query */
export async function query(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryParams,
  body: API.Admin,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseIPageAdmin>('/admin/admins/query', {
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
