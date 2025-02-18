declare namespace API {
  type Admin = {
    accountId?: number
    createTime?: string
    id?: number
    role?: number
    roleName?: string
    state?: number
    updateTime?: string
    username?: string
  }

  type auditParams = {
    goodsId: number
    state: boolean
  }

  type Auth = {
    createTime?: string
    description?: string
    icon?: string
    id?: number
    name?: string
    pagePath?: string
    parentId?: number
    path?: string
    updateTime?: string
  }

  type BaseResponseGoods = {
    code?: number
    data?: Goods
    description?: string
    message?: string
  }

  type BaseResponseIPageAdmin = {
    code?: number
    data?: IPageAdmin
    description?: string
    message?: string
  }

  type BaseResponseIPageGoods = {
    code?: number
    data?: IPageGoods
    description?: string
    message?: string
  }

  type BaseResponseIPageGoodsCategories = {
    code?: number
    data?: IPageGoodsCategories
    description?: string
    message?: string
  }

  type BaseResponseIPageRole = {
    code?: number
    data?: IPageRole
    description?: string
    message?: string
  }

  type BaseResponseIPageRoleToAuth = {
    code?: number
    data?: IPageRoleToAuth
    description?: string
    message?: string
  }

  type BaseResponseIPageSystemDict = {
    code?: number
    data?: IPageSystemDict
    description?: string
    message?: string
  }

  type BaseResponseIPageUser = {
    code?: number
    data?: IPageUser
    description?: string
    message?: string
  }

  type BaseResponseIPageUserOrder = {
    code?: number
    data?: IPageUserOrder
    description?: string
    message?: string
  }

  type BaseResponseListAuth = {
    code?: number
    data?: Auth[]
    description?: string
    message?: string
  }

  type BaseResponseListGoodsCategories = {
    code?: number
    data?: GoodsCategories[]
    description?: string
    message?: string
  }

  type BaseResponseListRole = {
    code?: number
    data?: Role[]
    description?: string
    message?: string
  }

  type BaseResponseListSystemDict = {
    code?: number
    data?: SystemDict[]
    description?: string
    message?: string
  }

  type BaseResponseListUser = {
    code?: number
    data?: User[]
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

  type BaseResponseRole = {
    code?: number
    data?: Role
    description?: string
    message?: string
  }

  type BaseResponseRoleToAuth = {
    code?: number
    data?: RoleToAuth
    description?: string
    message?: string
  }

  type BaseResponseUser = {
    code?: number
    data?: User
    description?: string
    message?: string
  }

  type BaseResponseUserOrder = {
    code?: number
    data?: UserOrder
    description?: string
    message?: string
  }

  type del1Params = {
    id: number
  }

  type delete1Params = {
    id: number
  }

  type delete2Params = {
    id: number
  }

  type delete3Params = {
    id: number
  }

  type delete4Params = {
    id: number
  }

  type delete5Params = {
    id: number
  }

  type delete6Params = {
    id: number
  }

  type delete7Params = {
    id: number
  }

  type deleteUsingDELETEParams = {
    id: number
  }

  type delParams = {
    commentId: number
  }

  type findOne1Params = {
    id: number
  }

  type findOne2Params = {
    id: number
  }

  type findOne3Params = {
    id: number
  }

  type findOne4Params = {
    id: number
  }

  type findOne5Params = {
    id: number
  }

  type findOneParams = {
    id: number
  }

  type findPage1Params = {
    pageNum: number
    pageSize: number
  }

  type findPage2Params = {
    pageNum: number
    pageSize: number
  }

  type findPage3Params = {
    pageNum: number
    pageSize: number
  }

  type findPage4Params = {
    pageNum: number
    pageSize: number
  }

  type findPageParams = {
    pageNum: number
    pageSize: number
  }

  type freeze1Params = {
    picId: string
  }

  type getInfoParams = {
    goodsId: number
  }

  type getSettingParams = {
    key: string
  }

  type Goods = {
    avatar?: string
    categoriesId?: number
    categoriesName?: string
    collection?: number
    createTime?: string
    detail?: string
    fileMd5?: string
    fileUrl?: string
    id?: number
    imagesMd5?: string[]
    imagesUrls?: string[]
    message?: string
    money?: number
    name?: string
    option?: string
    picIndex?: string
    showPortal?: boolean
    state?: number
    tags?: string
    uid?: number
    updateTime?: string
    username?: string
  }

  type GoodsCategories = {
    createTime?: string
    id?: number
    name?: string
    state?: number
    stateText?: string
    updateTime?: string
    url?: string
  }

  type GoodsPortalShow = {
    createTime?: string
    goodsId?: number
    id?: number
    updateTime?: string
  }

  type GoodsSnapshot = {
    createTime?: string
    fileMd5?: string
    goodsId?: number
    id?: number
    money?: number
    name?: string
    ownerId?: number
    picIndex?: string
    price?: number
    state?: number
    updateTime?: string
  }

  type iconPageParams = {
    pageNum: number
    pageSize: number
  }

  type IPageAdmin = {
    current?: number
    pages?: number
    records?: Admin[]
    size?: number
    total?: number
  }

  type IPageGoods = {
    current?: number
    pages?: number
    records?: Goods[]
    size?: number
    total?: number
  }

  type IPageGoodsCategories = {
    current?: number
    pages?: number
    records?: GoodsCategories[]
    size?: number
    total?: number
  }

  type IPageRole = {
    current?: number
    pages?: number
    records?: Role[]
    size?: number
    total?: number
  }

  type IPageRoleToAuth = {
    current?: number
    pages?: number
    records?: RoleToAuth[]
    size?: number
    total?: number
  }

  type IPageSystemDict = {
    current?: number
    pages?: number
    records?: SystemDict[]
    size?: number
    total?: number
  }

  type IPageUser = {
    current?: number
    pages?: number
    records?: User[]
    size?: number
    total?: number
  }

  type IPageUserOrder = {
    current?: number
    pages?: number
    records?: UserOrder[]
    size?: number
    total?: number
  }

  type isAdminParams = {
    accountId: number
  }

  type OrderItem = {
    asc?: boolean
    column?: string
  }

  type page1Params = {
    pageSize: number
    pageNum: number
  }

  type PageGoodsPortalShow = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    optimizeJoinOfCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: GoodsPortalShow[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type pageParams = {
    pageSize: number
    pageNum: number
  }

  type PageSystemDict = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    optimizeJoinOfCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: SystemDict[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageUserOrderGoods = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    optimizeJoinOfCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: UserOrderGoods[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type queryGoodsCategoriesInfoPageByOptionParams = {
    pageNum: number
    pageSize: number
  }

  type queryParams = {
    pageNum: number
    pageSize: number
  }

  type queryUserInfoPageByOptionParams = {
    pageNum: number
    pageSize: number
  }

  type Role = {
    authIds?: number[]
    authList?: Auth[]
    createTime?: string
    id?: number
    roleName?: string
    updateTime?: string
  }

  type RoleToAuth = {
    authId?: number
    authName?: string
    createTime?: string
    id?: number
    roleId?: number
    roleName?: string
    updateTime?: string
  }

  type SystemDict = {
    id?: number
    name?: string
    type?: string
    value?: string
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

  type UserOrder = {
    accountId?: number
    createTime?: string
    goodsSnapshots?: GoodsSnapshot[]
    id?: number
    money?: number
    payTime?: string
    payType?: string
    platTradeNo?: string
    remark?: string
    state?: number
    totalAmount?: number
    tradeNo?: string
    type?: string
    updateTime?: string
    username?: string
  }

  type UserOrderGoods = {
    createTime?: string
    goodsSnapshotId?: number
    id?: number
    orderId?: number
    state?: number
    updateTime?: string
  }
}
