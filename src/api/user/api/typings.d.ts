declare namespace API {
  type BaseResponseBoolean = {
    code?: number
    data?: boolean
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

  type BaseResponseUser = {
    code?: number
    data?: User
    description?: string
    message?: string
  }

  type delete1Params = {
    id: number
  }

  type deleteUsingDELETEParams = {
    id: number
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

  type forgetParams = {
    code: string
  }

  type getByIdParams = {
    id: number
  }

  type getOneByOptionParams = {
    column: string
    value: string
  }

  type getUserCodeParams = {
    code: string
  }

  type getUserInfoParams = {
    uid: number
  }

  type isOneParams = {
    accountId: number
  }

  type OrderItem = {
    asc?: boolean
    column?: string
  }

  type PageSso = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    optimizeJoinOfCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: Sso[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageSsoType = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    optimizeJoinOfCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: SsoType[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type regParams = {
    code: string
  }

  type sendForgetAUthCOdeParams = {
    email: string
  }

  type sendRegAuthCodeParams = {
    email: string
  }

  type Sso = {
    id?: number
    ssoToken?: string
    ssoUser?: string
    state?: number
    type?: number
    uid?: number
  }

  type SsoType = {
    createTime?: string
    id?: number
    state?: number
    type?: string
    updateTime?: string
  }

  type User = {
    avatar?: string
    createTime?: string
    email?: string
    id?: number
    password?: string
    roleName?: string
    ssoType?: string
    state?: number
    token?: string
    updateTime?: string
    username?: string
  }

  type usernameLikeListParams = {
    username: string
  }
}
