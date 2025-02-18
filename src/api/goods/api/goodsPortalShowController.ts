// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /goods/goodsPortalShow */
export async function findAll1(options?: { [key: string]: any }) {
  return request<API.GoodsPortalShow[]>('/goods/goodsPortalShow', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /goods/goodsPortalShow/ */
export async function saveOrUpdate1(body: API.GoodsPortalShow, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/goods/goodsPortalShow/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goodsPortalShow/${param0} */
export async function findOne1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOne1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.GoodsPortalShow[]>(`/goods/goodsPortalShow/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /goods/goodsPortalShow/${param0} */
export async function delete1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<boolean>(`/goods/goodsPortalShow/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /goods/goodsPortalShow/del_batch */
export async function deleteBatch1(body: number[], options?: { [key: string]: any }) {
  return request<boolean>('/goods/goodsPortalShow/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goodsPortalShow/page */
export async function findPage1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPage1Params,
  options?: { [key: string]: any }
) {
  return request<API.PageGoodsPortalShow>('/goods/goodsPortalShow/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
