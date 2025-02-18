declare namespace API {
  type addDataParams = {
    appId: string
  }

  type addNumToAccessKeyParams = {
    orderId: string
  }

  type BaseResponse = {
    code?: number
    data?: Record<string, any>
    description?: string
    message?: string
  }

  type BaseResponseListExcelApp = {
    code?: number
    data?: ExcelApp[]
    description?: string
    message?: string
  }

  type BaseResponseListExcelHeader = {
    code?: number
    data?: ExcelHeader[]
    description?: string
    message?: string
  }

  type BaseResponseMapStringObject = {
    code?: number
    data?: Record<string, any>
    description?: string
    message?: string
  }

  type BaseResponseMapStringString = {
    code?: number
    data?: Record<string, any>
    description?: string
    message?: string
  }

  type BaseResponseObject = {
    code?: number
    data?: Record<string, any>
    description?: string
    message?: string
  }

  type BaseResponseString = {
    code?: number
    data?: string
    description?: string
    message?: string
  }

  type createAccessKeyParams = {
    appId: string
  }

  type delete1Params = {
    id: number
  }

  type deleteDataParams = {
    appId: string
  }

  type deleteExcelAppParams = {
    appId: string
  }

  type deleteUsingDELETEParams = {
    id: number
  }

  type downloadParams = {
    fileName: string
  }

  type ExcelApp = {
    appId?: string
    createTime?: string
    description?: string
    filename?: string
    id?: number
    num?: number
    picIndex?: string
    price?: number
    sort?: number
    status?: number
    tags?: string
    uid?: number
    updateTime?: string
  }

  type ExcelColDropdown = {
    createTime?: string
    headerId?: number
    id?: number
    name?: string
    status?: number
    updateTime?: string
  }

  type ExcelHeader = {
    appId?: string
    createTime?: string
    dropdownList?: string[]
    excelApp?: number
    headerName?: string
    headerType?: string
    id?: number
    queryAble?: number
    sort?: number
    status?: number
    unit?: string
    updateTime?: string
    value?: string
  }

  type ExcelQueryConditionVo = {
    colName?: string
    value?: string
  }

  type exportDataParams = {
    appId: string
  }

  type findOne1Params = {
    id: number
  }

  type findOneParams = {
    id: number
  }

  type findPage1Params = {
    pageNum: number
    pageSize: number
  }

  type findPageParams = {
    pageNum: number
    pageSize: number
  }

  type getExcelAppParams = {
    appId: string
  }

  type getHeaderParams = {
    appId: string
  }

  type getHeaderWithDropdownParams = {
    appId: string
  }

  type listDataParams = {
    appId: string
    pageNum: number
    pageSize: number
  }

  type OrderItem = {
    asc?: boolean
    column?: string
  }

  type PageExcelColDropdown = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    optimizeJoinOfCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: ExcelColDropdown[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageExcelHeader = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    optimizeJoinOfCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: ExcelHeader[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type resetAccessKeyParams = {
    appId: string
  }

  type updateDataParams = {
    appId: string
  }

  type updateHeaderParams = {
    appId: string
  }
}
