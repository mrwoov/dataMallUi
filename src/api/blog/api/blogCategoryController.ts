// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /blog/blog-category/ */
export async function page1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.page1Params,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponse>('/blog/blog-category/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /blog/blog-category/ */
export async function addCategory(body: API.BlogCategory, options?: { [key: string]: any }) {
  return request<API.BaseResponse>('/blog/blog-category/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /blog/blog-category/${param0} */
export async function deleteCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCategoryParams,
  options?: { [key: string]: any }
) {
  const { categoryId: param0, ...queryParams } = params
  return request<API.BaseResponse>(`/blog/blog-category/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}
