export interface ErrorRepsonse<Data> {
  message: string
  data?: Data
}
export interface SuccessRepsonse<Data> {
  message: string
  data: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
