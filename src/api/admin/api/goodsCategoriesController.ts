// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /admin/goodsCategories/ */
export async function getList1(options?: { [key: string]: any }) {
  return request<API.BaseResponseListGoodsCategories>('/admin/goodsCategories/', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /admin/goodsCategories/admin */
export async function save2(body: API.GoodsCategories, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/goodsCategories/admin', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /admin/goodsCategories/admin/${param0} */
export async function delete6(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete6Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/admin/goodsCategories/admin/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/goodsCategories/admin/del_batch */
export async function deleteBatch6(body: number[], options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/admin/goodsCategories/admin/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /admin/goodsCategories/admin/query */
export async function queryGoodsCategoriesInfoPageByOption(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryGoodsCategoriesInfoPageByOptionParams,
  body: API.GoodsCategories,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseIPageGoodsCategories>('/admin/goodsCategories/admin/query', {
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
