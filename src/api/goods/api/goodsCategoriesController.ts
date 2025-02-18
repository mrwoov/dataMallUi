// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /goods/goodsCategories/ */
export async function getList1(options?: { [key: string]: any }) {
  return request<API.BaseResponseListGoodsCategories>('/goods/goodsCategories/', {
    method: 'GET',
    ...(options || {}),
  })
}
