// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /admin/accounts/admin/${param0} */
export async function findOne5(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOne5Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseUser>(`/admin/accounts/admin/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/accounts/admin/getListByOption */
export async function usernameLikeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.usernameLikeListParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListUser>('/admin/accounts/admin/getListByOption', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/accounts/admin/query */
export async function queryUserInfoPageByOption(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryUserInfoPageByOptionParams,
  body: API.User,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseIPageUser>('/admin/accounts/admin/query', {
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
