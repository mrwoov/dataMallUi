// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /blog/blog-article/${param0} */
export async function getBlogDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBlogDetailParams,
  options?: { [key: string]: any }
) {
  const { blogId: param0, ...queryParams } = params
  return request<API.BaseResponse>(`/blog/blog-article/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /blog/blog-article/${param0} */
export async function delete1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete1Params,
  options?: { [key: string]: any }
) {
  const { blogId: param0, ...queryParams } = params
  return request<API.BaseResponse>(`/blog/blog-article/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /blog/blog-article/publish */
export async function publish(body: API.BlogVO, options?: { [key: string]: any }) {
  return request<API.BaseResponse>('/blog/blog-article/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /blog/blog-article/update */
export async function update(body: API.BlogVO, options?: { [key: string]: any }) {
  return request<API.BaseResponse>('/blog/blog-article/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
