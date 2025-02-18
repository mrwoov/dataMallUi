declare namespace API {
  type BaseResponseGoods = {
    code?: number
    data?: Goods
    description?: string
    message?: string
  }

  type BaseResponseIPageGoodsComment = {
    code?: number
    data?: IPageGoodsComment
    description?: string
    message?: string
  }

  type BaseResponseListGoods = {
    code?: number
    data?: Goods[]
    description?: string
    message?: string
  }

  type BaseResponseListGoodsCategories = {
    code?: number
    data?: GoodsCategories[]
    description?: string
    message?: string
  }

  type BaseResponseListGoodsPic = {
    code?: number
    data?: GoodsPic[]
    description?: string
    message?: string
  }

  type BaseResponseListString = {
    code?: number
    data?: string[]
    description?: string
    message?: string
  }

  type BaseResponseLong = {
    code?: number
    data?: number
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

  type categoriesGoodsParams = {
    categories: string
  }

  type del1Params = {
    commentId: number
  }

  type del2Params = {
    goodsId: number
  }

  type delete1Params = {
    id: number
  }

  type delete2Params = {
    id: number
  }

  type deleteGoodsSnapshotParams = {
    goodsId: number
  }

  type deleteUsingDELETEParams = {
    id: number
  }

  type delParams = {
    picId: string
  }

  type downloadGoodsSourceParams = {
    tradeNo: string
  }

  type downloadParams = {
    md5: string
  }

  type findOne1Params = {
    id: number
  }

  type findOne2Params = {
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

  type findPageParams = {
    pageNum: number
    pageSize: number
  }

  type followParams = {
    goodsId: number
  }

  type getByIdParams = {
    id: number
  }

  type getFollowNumParams = {
    goodsId: string
  }

  type getGoodsPriceParams = {
    id: number
  }

  type getGoodsUrlParams = {
    goodsId: number
  }

  type getInfoParams = {
    goodsId: number
  }

  type getListParams = {
    goodsId: number
    pageNum: number
    pageSize: number
  }

  type getOrderGoodsSnapshotParams = {
    orderId: number
  }

  type getUserGoodsListParams = {
    uid: string
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

  type GoodsComment = {
    avatar?: string
    child?: GoodsComment
    createTime?: string
    goodsId?: number
    id?: number
    message?: string
    parentId?: number
    state?: number
    uid?: number
    username?: string
  }

  type GoodsFile = {
    accountId?: number
    createTime?: string
    filePath?: string
    filename?: string
    id?: number
    md5?: string
    status?: number
    updateTime?: string
  }

  type GoodsPic = {
    createTime?: string
    goodsId?: number
    id?: number
    states?: number
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

  type IPageGoodsComment = {
    current?: number
    pages?: number
    records?: GoodsComment[]
    size?: number
    total?: number
  }

  type isExistSnapshotParams = {
    goods: Goods
  }

  type OrderItem = {
    asc?: boolean
    column?: string
  }

  type PageGoodsFile = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    optimizeJoinOfCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: GoodsFile[]
    searchCount?: boolean
    size?: number
    total?: number
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

  type PageXlsxApi = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    optimizeJoinOfCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: XlsxApi[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type releaseOffParams = {
    goodsId: number
  }

  type releaseOnParams = {
    goodsId: number
  }

  type saveGoodsSnapshotParams = {
    goodsId: number
  }

  type saveOrderGoodsParams = {
    goodsId: number
    orderId: number
  }

  type searchParams = {
    keyword: string
  }

  type sendDownloadParams = {
    tradeNo: string
  }

  type snapshotHaveGoodsParams = {
    snapshotId: number
    goodsId: number
  }

  type unfollowParams = {
    goodsId: number
  }

  type userIsCollectionParams = {
    goodsId: number
  }

  type XlsxApi = {
    accountId?: number
    apiId?: string
    createdTime?: string
    file?: string
    id?: number
    name?: string
    state?: number
    updatedTime?: string
  }
}
