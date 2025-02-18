// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /admin/auths/admin */
export async function getTree(options?: { [key: string]: any }) {
  return request<API.BaseResponseListAuth>('/admin/auths/admin', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /admin/auths/admin */
export async function save3(body: API.Auth, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/auths/admin', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /admin/auths/admin/${param0} */
export async function delete7(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete7Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/admin/auths/admin/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/auths/icons */
export async function getIcons(options?: { [key: string]: any }) {
  return request<API.BaseResponseListSystemDict>('/admin/auths/icons', {
    method: 'GET',
    ...(options || {}),
  })
}
