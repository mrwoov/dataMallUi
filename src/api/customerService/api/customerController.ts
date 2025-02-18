// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** 此处后端没有提供注释 POST /customerService/customer/ai */
export async function aiResponse(body: string, options?: { [key: string]: any }) {
  return request<API.BaseResponseAIResponse>('/customerService/customer/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
