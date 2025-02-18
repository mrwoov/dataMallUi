// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /excel/excelHeader */
export async function findAll(options?: { [key: string]: any }) {
  return request<API.ExcelHeader[]>('/excel/excelHeader', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /excel/excelHeader/ */
export async function saveOrUpdate(body: API.ExcelHeader, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/excel/excelHeader/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /excel/excelHeader/${param0} */
export async function findOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOneParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.ExcelHeader[]>(`/excel/excelHeader/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /excel/excelHeader/${param0} */
export async function deleteUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<boolean>(`/excel/excelHeader/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /excel/excelHeader/del_batch */
export async function deleteBatch(body: number[], options?: { [key: string]: any }) {
  return request<boolean>('/excel/excelHeader/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /excel/excelHeader/page */
export async function findPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPageParams,
  options?: { [key: string]: any }
) {
  return request<API.PageExcelHeader>('/excel/excelHeader/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
