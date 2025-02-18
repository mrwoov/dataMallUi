// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 POST /pic/picture/admin/list */
export async function getList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getListParams,
  options?: { [key: string]: any }
) {
  return request<API.PagePicture>('/pic/picture/admin/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /pic/picture/admin/upload */
export async function uploadAdmin(body: {}, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/pic/picture/admin/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /pic/picture/user/upload */
export async function uploadUser(body: {}, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/pic/picture/user/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
