import { generateService } from '@umijs/openapi'

/**
 * python提供的接口文档地址，生成prefix
 */
generateService(
  {
    requestLibPath: "import request from '@/request'",
    schemaPath: 'http://127.0.0.1:9090/admin/v3/api-docs',
    serversPath: './src/api/admin',
  },
)
generateService({
  requestLibPath: "import request from '@/request'",
  schemaPath: 'http://127.0.0.1:9090/blog/v3/api-docs',
  serversPath: './src/api/blog',
},)
generateService({
  requestLibPath: "import request from '@/request'",
  schemaPath: 'http://127.0.0.1:9090/customerService/v3/api-docs',
  serversPath: './src/api/customerService',
},)
generateService({
  requestLibPath: "import request from '@/request'",
  schemaPath: 'http://127.0.0.1:9090/excel/v3/api-docs',
  serversPath: './src/api/excel',
})

generateService({
  requestLibPath: "import request from '@/request'",
  schemaPath: 'http://127.0.0.1:9090/goods/v3/api-docs',
  serversPath: './src/api/goods',
},)
generateService({
  requestLibPath: "import request from '@/request'",
  schemaPath: 'http://127.0.0.1:9090/order/v3/api-docs',
  serversPath: './src/api/order',
},)
generateService({
  requestLibPath: "import request from '@/request'",
  schemaPath: 'http://127.0.0.1:9090/pic/v3/api-docs',
  serversPath: './src/api/pic',
},)
generateService({
  requestLibPath: "import request from '@/request'",
  schemaPath: 'http://127.0.0.1:9090/search/v3/api-docs',
  serversPath: './src/api/search',
})
generateService({
  requestLibPath: "import request from '@/request'",
  schemaPath: 'http://127.0.0.1:9090/user/v3/api-docs',
  serversPath: './src/api/user',
})
