// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 DELETE /goods/goodsPic/ */
export async function del(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>('/goods/goodsPic/', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /goods/goodsPic/ */
export async function save(body: API.GoodsPic, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/goods/goodsPic/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goodsPic/${param0} */
export async function getGoodsUrl(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsUrlParams,
  options?: { [key: string]: any }
) {
  const { goodsId: param0, ...queryParams } = params
  return request<API.BaseResponseListGoodsPic>(`/goods/goodsPic/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}
