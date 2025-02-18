// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /admin/goodsPortalShow */
export async function findAll3(options?: { [key: string]: any }) {
  return request<API.GoodsPortalShow[]>('/admin/goodsPortalShow', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /admin/goodsPortalShow/ */
export async function saveOrUpdate3(body: API.GoodsPortalShow, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/goodsPortalShow/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/goodsPortalShow/${param0} */
export async function findOne4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOne4Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.GoodsPortalShow[]>(`/admin/goodsPortalShow/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /admin/goodsPortalShow/${param0} */
export async function delete5(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete5Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<boolean>(`/admin/goodsPortalShow/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/goodsPortalShow/del_batch */
export async function deleteBatch5(body: number[], options?: { [key: string]: any }) {
  return request<boolean>('/admin/goodsPortalShow/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/goodsPortalShow/page */
export async function findPage4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPage4Params,
  options?: { [key: string]: any }
) {
  return request<API.PageGoodsPortalShow>('/admin/goodsPortalShow/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
