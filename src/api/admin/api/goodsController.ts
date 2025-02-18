// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 POST /admin/goods/admin/freeze */
export async function freeze(body: API.Goods, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/goods/admin/freeze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/goods/admin/page */
export async function page1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.page1Params,
  body: API.Goods,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseIPageGoods>('/admin/goods/admin/page', {
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

/** 此处后端没有提供注释 GET /admin/goods/audit */
export async function audit(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.auditParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>('/admin/goods/audit', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/goods/changeGoodsPortalShow */
export async function changeGoodsPortalShow(body: API.Goods, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/goods/changeGoodsPortalShow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/goods/get_not_audit */
export async function getNotAuditGoodsInfo(options?: { [key: string]: any }) {
  return request<API.BaseResponseGoods>('/admin/goods/get_not_audit', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /admin/goods/info/${param0} */
export async function getInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfoParams,
  options?: { [key: string]: any }
) {
  const { goodsId: param0, ...queryParams } = params
  return request<API.BaseResponseGoods>(`/admin/goods/info/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}
