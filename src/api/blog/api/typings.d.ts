declare namespace API {
  type BaseResponse = {
    code?: number
    data?: Record<string, any>
    description?: string
    message?: string
  }

  type BlogCategory = {
    createTime?: string
    id?: number
    name?: string
    parentId?: number
    sortOrder?: number
    state?: number
    updateTime?: string
  }

  type BlogTag = {
    color?: string
    createTime?: string
    id?: number
    name?: string
    state?: number
    updateTime?: string
  }

  type BlogVO = {
    authorId?: number
    categoryId?: number
    categoryName?: string
    contentHtml?: string
    contentMd?: string
    coverImage?: string
    createTime?: string
    description?: string
    id?: number
    state?: number
    tagIds?: number[]
    tagNames?: string[]
    title?: string
    updateTime?: string
  }

  type delete1Params = {
    blogId: number
  }

  type deleteCategoryParams = {
    categoryId: number
  }

  type deleteUsingDELETEParams = {
    id: number
  }

  type getBlogDetailParams = {
    blogId: number
  }

  type page1Params = {
    page: number
    pageSize: number
  }

  type pageParams = {
    page?: number
    size?: number
  }
}
