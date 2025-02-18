// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /goods/goodsFiles */
export async function findAll2(options?: { [key: string]: any }) {
  return request<API.GoodsFile[]>('/goods/goodsFiles', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /goods/goodsFiles/ */
export async function saveOrUpdate2(body: API.GoodsFile, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/goods/goodsFiles/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goodsFiles/${param0} */
export async function findOne2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOne2Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.GoodsFile>(`/goods/goodsFiles/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /goods/goodsFiles/${param0} */
export async function delete2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete2Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<boolean>(`/goods/goodsFiles/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /goods/goodsFiles/del_batch */
export async function deleteBatch2(body: number[], options?: { [key: string]: any }) {
  return request<boolean>('/goods/goodsFiles/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goodsFiles/download/${param0} */
export async function download(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadParams,
  options?: { [key: string]: any }
) {
  const { md5: param0, ...queryParams } = params
  return request<API.BaseResponseString>(`/goods/goodsFiles/download/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /goods/goodsFiles/page */
export async function findPage2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPage2Params,
  options?: { [key: string]: any }
) {
  return request<API.PageGoodsFile>('/goods/goodsFiles/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /goods/goodsFiles/user/upload_file */
export async function userUploadFile(body: {}, options?: { [key: string]: any }) {
  return request<API.BaseResponseMapStringString>('/goods/goodsFiles/user/upload_file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /goods/goodsFiles/user/upload_pic */
export async function userUploadPic(body: {}, options?: { [key: string]: any }) {
  return request<API.BaseResponseMapStringString>('/goods/goodsFiles/user/upload_pic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
