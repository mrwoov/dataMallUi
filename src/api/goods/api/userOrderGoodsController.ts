// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /goods/userOrderGoods/deleteGoodsSnapshot */
export async function deleteGoodsSnapshot(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteGoodsSnapshotParams,
  options?: { [key: string]: any }
) {
  return request<boolean>('/goods/userOrderGoods/deleteGoodsSnapshot', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/userOrderGoods/download/${param0} */
export async function downloadGoodsSource(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadGoodsSourceParams,
  options?: { [key: string]: any }
) {
  const { tradeNo: param0, ...queryParams } = params
  return request<API.BaseResponseListString>(`/goods/userOrderGoods/download/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/userOrderGoods/getOrderGoodsSnapshot */
export async function getOrderGoodsSnapshot(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrderGoodsSnapshotParams,
  options?: { [key: string]: any }
) {
  return request<API.GoodsSnapshot[]>('/goods/userOrderGoods/getOrderGoodsSnapshot', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/userOrderGoods/isExistSnapshot */
export async function isExistSnapshot(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.isExistSnapshotParams,
  options?: { [key: string]: any }
) {
  return request<number>('/goods/userOrderGoods/isExistSnapshot', {
    method: 'GET',
    params: {
      ...params,
      goods: undefined,
      ...params['goods'],
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/userOrderGoods/saveGoodsSnapshot */
export async function saveGoodsSnapshot(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.saveGoodsSnapshotParams,
  options?: { [key: string]: any }
) {
  return request<number>('/goods/userOrderGoods/saveGoodsSnapshot', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/userOrderGoods/saveOrderGoods */
export async function saveOrderGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.saveOrderGoodsParams,
  options?: { [key: string]: any }
) {
  return request<boolean>('/goods/userOrderGoods/saveOrderGoods', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/userOrderGoods/sendDownload/${param0} */
export async function sendDownload(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendDownloadParams,
  options?: { [key: string]: any }
) {
  const { tradeNo: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/goods/userOrderGoods/sendDownload/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/userOrderGoods/snapshotHaveGoods */
export async function snapshotHaveGoods(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.snapshotHaveGoodsParams,
  options?: { [key: string]: any }
) {
  return request<boolean>('/goods/userOrderGoods/snapshotHaveGoods', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
