declare namespace API {
  type BaseResponse = {
    code?: number
    data?: Record<string, any>
    description?: string
    message?: string
  }

  type searchParams = {
    keyword: string
    category_id?: string
    page?: string
    size?: string
    type?: string
  }
}
