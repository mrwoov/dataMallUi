// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 POST /excel/excelApp/addData/${param0} */
export async function addData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addDataParams,
  body: Record<string, any>,
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/excel/excelApp/addData/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /excel/excelApp/createExcelApp */
export async function createExcelApp(body: API.ExcelApp, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/excel/excelApp/createExcelApp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /excel/excelApp/deleteData/${param0} */
export async function deleteData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDataParams,
  body: string[],
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/excel/excelApp/deleteData/${param0}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /excel/excelApp/deleteExcelApp/${param0} */
export async function deleteExcelApp(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteExcelAppParams,
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/excel/excelApp/deleteExcelApp/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /excel/excelApp/download/${param0} */
export async function download(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadParams,
  options?: { [key: string]: any }
) {
  const { fileName: param0, ...queryParams } = params
  return request<any>(`/excel/excelApp/download/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /excel/excelApp/exportData/${param0} */
export async function exportData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.exportDataParams,
  body: API.ExcelQueryConditionVo[],
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponseMapStringString>(`/excel/excelApp/exportData/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /excel/excelApp/feign/getExcelApp */
export async function getExcelApp(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getExcelAppParams,
  options?: { [key: string]: any }
) {
  return request<API.ExcelApp>('/excel/excelApp/feign/getExcelApp', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /excel/excelApp/getHeader/${param0} */
export async function getHeader(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getHeaderParams,
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponseListExcelHeader>(`/excel/excelApp/getHeader/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /excel/excelApp/getHeaderWithQuery/${param0} */
export async function getHeaderWithDropdown(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getHeaderWithDropdownParams,
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponseListExcelHeader>(`/excel/excelApp/getHeaderWithQuery/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /excel/excelApp/listData/${param0} */
export async function listData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listDataParams,
  body: API.ExcelQueryConditionVo[],
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponseMapStringObject>(`/excel/excelApp/listData/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...queryParams,
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /excel/excelApp/listExcelApp */
export async function listExcelApp(options?: { [key: string]: any }) {
  return request<API.BaseResponseListExcelApp>('/excel/excelApp/listExcelApp', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /excel/excelApp/listExcelAppOther */
export async function listExcelAppOther(options?: { [key: string]: any }) {
  return request<API.BaseResponseListExcelApp>('/excel/excelApp/listExcelAppOther', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PUT /excel/excelApp/updateData/${param0} */
export async function updateData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateDataParams,
  body: Record<string, any>,
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/excel/excelApp/updateData/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PUT /excel/excelApp/updateExcelApp */
export async function updateExcelApp(body: API.ExcelApp, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/excel/excelApp/updateExcelApp', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /excel/excelApp/updateHeader/${param0} */
export async function updateHeader(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateHeaderParams,
  body: API.ExcelHeader[],
  options?: { [key: string]: any }
) {
  const { appId: param0, ...queryParams } = params
  return request<API.BaseResponseObject>(`/excel/excelApp/updateHeader/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /excel/excelApp/upload */
export async function upload(body: {}, options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/excel/excelApp/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
