// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 DELETE /admin/goodsComment/del */
export async function del(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>('/admin/goodsComment/del', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
