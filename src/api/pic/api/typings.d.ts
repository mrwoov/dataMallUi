declare namespace API {
  type BaseResponseObject = {
    code?: number
    data?: Record<string, any>
    description?: string
    message?: string
  }

  type getListParams = {
    uid?: string
    pic_id?: string
    state?: string
    page: number
    size: number
  }

  type OrderItem = {
    asc?: boolean
    column?: string
  }

  type PagePicture = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    optimizeJoinOfCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: Picture[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type Picture = {
    createTime?: string
    id?: number
    key?: string
    picFormat?: string
    picHeight?: number
    picName?: string
    picScale?: number
    picSize?: number
    picWidth?: number
    state?: number
    uid?: number
    updateTime?: string
    url?: string
  }
}
