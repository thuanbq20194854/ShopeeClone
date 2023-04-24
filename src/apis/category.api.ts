import { Category } from 'src/types/category.type'
import { SuccessRepsonse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'categories'

const categoriesApi = {
  getCategories() {
    return http.get<SuccessRepsonse<Category[]>>(URL)
  }
}

export default categoriesApi
