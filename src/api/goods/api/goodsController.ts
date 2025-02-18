// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 POST /goods/goods/ */
export async function release(body: API.Goods, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/goods/goods/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /goods/goods/ */
export async function del2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.del2Params,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>('/goods/goods/', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goods/categories */
export async function categoriesGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.categoriesGoodsParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListGoods>('/goods/goods/categories', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goods/getById/${param0} */
export async function getById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.Goods>(`/goods/goods/getById/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goods/getGoodsListAll */
export async function getGoodsListAll(options?: { [key: string]: any }) {
  return request<API.Goods[]>('/goods/goods/getGoodsListAll', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /goods/goods/getGoodsListByIds */
export async function getGoodsListByIds(body: number[], options?: { [key: string]: any }) {
  return request<API.Goods[]>('/goods/goods/getGoodsListByIds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goods/getGoodsPrice/${param0} */
export async function getGoodsPrice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGoodsPriceParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<number>(`/goods/goods/getGoodsPrice/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goods/getGoodsWithFiveMinutesAgoUpdate */
export async function getGoodsWithFiveMinutesAgoUpdate(options?: { [key: string]: any }) {
  return request<API.Goods[]>('/goods/goods/getGoodsWithFiveMinutesAgoUpdate', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goods/getPortalIndex */
export async function getPortalIndex(options?: { [key: string]: any }) {
  return request<API.BaseResponseListGoods>('/goods/goods/getPortalIndex', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goods/info/${param0} */
export async function getInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfoParams,
  options?: { [key: string]: any }
) {
  const { goodsId: param0, ...queryParams } = params
  return request<API.BaseResponseGoods>(`/goods/goods/info/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /goods/goods/infos */
export async function getInfos(body: number[], options?: { [key: string]: any }) {
  return request<API.BaseResponseListGoods>('/goods/goods/infos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goods/list/${param0} */
export async function getUserGoodsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserGoodsListParams,
  options?: { [key: string]: any }
) {
  const { uid: param0, ...queryParams } = params
  return request<API.BaseResponseListGoods>(`/goods/goods/list/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /goods/goods/release_off */
export async function releaseOff(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.releaseOffParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>('/goods/goods/release_off', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /goods/goods/release_on */
export async function releaseOn(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.releaseOnParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>('/goods/goods/release_on', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goods/search */
export async function search(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListGoods>('/goods/goods/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /goods/goods/update */
export async function updateGoods(body: API.Goods, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/goods/goods/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
