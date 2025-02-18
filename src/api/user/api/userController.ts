// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 POST /user/users/bind */
export async function bind(body: API.User, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/user/users/bind', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /user/users/forget/${param0} */
export async function forget(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.forgetParams,
  body: API.User,
  options?: { [key: string]: any }
) {
  const { code: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/user/users/forget/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/users/forget/send_code/${param0} */
export async function sendForgetAUthCOde(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendForgetAUthCOdeParams,
  options?: { [key: string]: any }
) {
  const { email: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/user/users/forget/send_code/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/users/getById/${param0} */
export async function getById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.User>(`/user/users/getById/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/users/getListByOption */
export async function usernameLikeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.usernameLikeListParams,
  options?: { [key: string]: any }
) {
  return request<API.User[]>('/user/users/getListByOption', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/users/getOneByOption */
export async function getOneByOption(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOneByOptionParams,
  options?: { [key: string]: any }
) {
  return request<API.User>('/user/users/getOneByOption', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/users/getWxCode */
export async function getUserCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserCodeParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseString>('/user/users/getWxCode', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/users/is_one/${param0} */
export async function isOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.isOneParams,
  options?: { [key: string]: any }
) {
  const { accountId: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/user/users/is_one/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /user/users/login */
export async function login(body: API.User, options?: { [key: string]: any }) {
  return request<API.BaseResponseMapStringString>('/user/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /user/users/reg/${param0} */
export async function reg(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.regParams,
  body: API.User,
  options?: { [key: string]: any }
) {
  const { code: param0, ...queryParams } = params
  return request<API.BaseResponseBoolean>(`/user/users/reg/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/users/reg/send_code/${param0} */
export async function sendRegAuthCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendRegAuthCodeParams,
  options?: { [key: string]: any }
) {
  const { email: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/user/users/reg/send_code/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/users/token */
export async function checkToken(options?: { [key: string]: any }) {
  return request<API.BaseResponseMapStringString>('/user/users/token', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/users/tokenToUid */
export async function tokenToUid(options?: { [key: string]: any }) {
  return request<number>('/user/users/tokenToUid', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /user/users/userInfo/${param0} */
export async function getUserInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInfoParams,
  options?: { [key: string]: any }
) {
  const { uid: param0, ...queryParams } = params
  return request<API.BaseResponseUser>(`/user/users/userInfo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}
