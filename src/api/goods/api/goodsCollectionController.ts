// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /goods/goodsCollections/follow/${param0} */
export async function follow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.followParams,
  options?: { [key: string]: any }
) {
  const { goodsId: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/goods/goodsCollections/follow/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goodsCollections/get_num/${param0} */
export async function getFollowNum(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFollowNumParams,
  options?: { [key: string]: any }
) {
  const { goodsId: param0, ...queryParams } = params
  return request<API.BaseResponseLong>(`/goods/goodsCollections/get_num/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goodsCollections/get_user_follow */
export async function getUserFollowGoods(options?: { [key: string]: any }) {
  return request<API.BaseResponseListGoods>('/goods/goodsCollections/get_user_follow', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goodsCollections/isCollection/${param0} */
export async function userIsCollection(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userIsCollectionParams,
  options?: { [key: string]: any }
) {
  const { goodsId: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/goods/goodsCollections/isCollection/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goodsCollections/unfollow/${param0} */
export async function unfollow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.unfollowParams,
  options?: { [key: string]: any }
) {
  const { goodsId: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/goods/goodsCollections/unfollow/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}
