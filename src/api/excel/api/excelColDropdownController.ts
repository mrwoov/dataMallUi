// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /excel/excelColDropdown */
export async function findAll1(options?: { [key: string]: any }) {
  return request<API.ExcelColDropdown[]>('/excel/excelColDropdown', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PATCH /excel/excelColDropdown/ */
export async function saveOrUpdate1(body: API.ExcelColDropdown, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/excel/excelColDropdown/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /excel/excelColDropdown/${param0} */
export async function findOne1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findOne1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.ExcelColDropdown[]>(`/excel/excelColDropdown/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /excel/excelColDropdown/${param0} */
export async function delete1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delete1Params,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<boolean>(`/excel/excelColDropdown/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /excel/excelColDropdown/del_batch */
export async function deleteBatch1(body: number[], options?: { [key: string]: any }) {
  return request<boolean>('/excel/excelColDropdown/del_batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /excel/excelColDropdown/page */
export async function findPage1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findPage1Params,
  options?: { [key: string]: any }
) {
  return request<API.PageExcelColDropdown>('/excel/excelColDropdown/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
