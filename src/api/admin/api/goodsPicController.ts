// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /admin/goodsPic/admin */
export async function freeze1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.freeze1Params,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>('/admin/goodsPic/admin', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
