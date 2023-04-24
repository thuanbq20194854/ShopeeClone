import useQueryParams from 'src/hooks/useQueryParams'
import { ProductListConfig } from 'src/types/product.type'

import { omitBy, isUndefined } from 'lodash'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name,
      category: queryParams.category
    },
    isUndefined
  )

  return queryConfig
}

/* 
The omitBy function is imported from the lodash library and is used to create a new object with 
all the properties of the provided object that satisfy the given condition. In this code, 
it is used to remove any properties from the queryParams object that have an undefined value, 
which is done using the isUndefined function also imported from lodash. The resulting object 
with non-undefined properties is then assigned to the queryConfig obj ect.

*/
