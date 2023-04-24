import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

import * as yup from 'yup'

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }

  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài kí tự 5-160')
    .max(160, 'Độ dài kí tự 5-160'),
  password: yup.string().required('Password là bắt buộc').min(6, 'Độ dài kí tự 6-160').max(160, 'Độ dài kí tự 6-160'),
  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(5, 'Độ dài kí tự 5-160')
    .max(160, 'Độ dài kí tự 5-160')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  price_min: yup.string().test({
    name: 'price_not_allow',
    message: 'Gía không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price_not_allow',
    message: 'Gía không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export type Schema = yup.InferType<typeof schema>

// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//   email: {
//     required: {
//       value: true,
//       message: 'Email là bắt buộc'
//     },
//     pattern: {
//       value: /^\S+@\S+\.\S+$/,
//       message: 'Email không đúng định dạng'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài kí tự 5-160'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài kí tự 5-160'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Password là bắt buộc'
//     },

//     maxLength: {
//       value: 160,
//       message: 'Độ dài kí tự 5-160'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài kí tự 5-160'
//     }
//   },
//   confirm_password: {
//     required: {
//       value: true,
//       message: 'Nhập lại password là bắt buộc'
//     },

//     maxLength: {
//       value: 160,
//       message: 'Độ dài kí tự 5-160'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài kí tự 5-160'
//     },
//     validate:
//       typeof getValues === 'function'
//         ? (value) => value === getValues('password') || 'Nhập password không khớp'
//         : undefined
//   }
// })
