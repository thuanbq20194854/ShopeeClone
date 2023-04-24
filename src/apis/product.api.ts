import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessRepsonse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/products'

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessRepsonse<ProductList>>(URL, {
      params
    })
  },

  getProductDetail(id: string) {
    return http.get<SuccessRepsonse<Product>>(`${URL}/${id}`)
  }
}

export default productApi
