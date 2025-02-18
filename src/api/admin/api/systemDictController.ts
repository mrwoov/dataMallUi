// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /admin/systemDict/ */
export async function findAll1(options?: { [key: string]: any }) {
  return request<API.BaseResponseListSystemDict>('/admin/systemDict/', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /admin/systemDict/admin */
export async function saveOrUpdate1(body: API.SystemDict, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/systemDict/admin', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /admin/systemDict/admin/${param0} */
export async function delete1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/admin/systemDict/admin/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/systemDict/admin/del_batch */
export async function deleteBatch1(body: number[], options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/systemDict/admin/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/systemDict/admin/getSetting */
export async function getSetting(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSettingParams,
  options?: { [key: string]: any }
) {
  return request<string>('/admin/systemDict/admin/getSetting', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/systemDict/admin/icon_page */
export async function iconPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.iconPageParams,
  body: API.SystemDict,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseIPageSystemDict>('/admin/systemDict/admin/icon_page', {
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

/** 此处后端没有提供注释 GET /admin/systemDict/admin/page */
export async function findPage3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPage3Params,
  options?: { [key: string]: any }
) {
  return request<API.PageSystemDict>('/admin/systemDict/admin/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
