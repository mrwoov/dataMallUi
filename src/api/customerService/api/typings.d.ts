declare namespace API {
  type AIResponse = {
    code?: string
    message?: string
  }

  type BaseResponseAIResponse = {
    code?: number
    data?: AIResponse
    description?: string
    message?: string
  }
}
