// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /search/search */
export async function search(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponse>('/search/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
