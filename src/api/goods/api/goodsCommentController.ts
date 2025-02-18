// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /goods/goodsComment/ */
export async function getList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getListParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseIPageGoodsComment>('/goods/goodsComment/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /goods/goodsComment/del */
export async function del1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.del1Params,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>('/goods/goodsComment/del', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /goods/goodsComment/send */
export async function send(body: API.GoodsComment, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/goods/goodsComment/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
