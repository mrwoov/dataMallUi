declare namespace API {
  type BaseResponseIPageUserOrder = {
    code?: number
    data?: IPageUserOrder
    description?: string
    message?: string
  }

  type BaseResponseListUserOrder = {
    code?: number
    data?: UserOrder[]
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

  type checkOrderParams = {
    trade_no: string
  }

  type closeParams = {
    trade_no: string
  }

  type getOrderFromFeignParams = {
    trade_no: string
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

  type IPageUserOrder = {
    current?: number
    pages?: number
    records?: UserOrder[]
    size?: number
    total?: number
  }

  type pageParams = {
    pageSize: number
    pageNum: number
  }

  type payParams = {
    trade_no: string
    return_url: string
  }

  type submitOrderParams = {
    type: string
    goods_id?: number
    app_id?: string
  }

  type updateOrderStateFromFeignParams = {
    trade_no: string
    state: number
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
}
