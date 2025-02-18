// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 GET /order/order/check */
export async function checkOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkOrderParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>('/order/order/check', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /order/order/close */
export async function close(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.closeParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseObject>('/order/order/close', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /order/order/feign/get */
export async function getOrderFromFeign(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrderFromFeignParams,
  options?: { [key: string]: any }
) {
  return request<API.UserOrder>('/order/order/feign/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /order/order/feign/updateOrderState */
export async function updateOrderStateFromFeign(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateOrderStateFromFeignParams,
  options?: { [key: string]: any }
) {
  return request<boolean>('/order/order/feign/updateOrderState', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /order/order/pay/alipay */
export async function pay(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.payParams,
  options?: { [key: string]: any }
) {
  return request<string>('/order/order/pay/alipay', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /order/order/submit */
export async function submitOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.submitOrderParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseMapStringString>('/order/order/submit', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /order/order/user_get_all */
export async function getUserALlOrder(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserOrder>('/order/order/user_get_all', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /order/order/user_get_buy */
export async function getUserBuyOrder(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserOrder>('/order/order/user_get_buy', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /order/order/user_get_noPay */
export async function getUserNoPayOrder(options?: { [key: string]: any }) {
  return request<API.BaseResponseListUserOrder>('/order/order/user_get_noPay', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /order/order/user/page */
export async function page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageParams,
  body: API.UserOrder,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseIPageUserOrder>('/order/order/user/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  })
}
