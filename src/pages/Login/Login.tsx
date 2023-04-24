import { Link, useNavigate } from 'react-router-dom'
import { Schema, schema } from 'src/utils/rules'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorRepsonse } from 'src/types/utils.type'
import Input from 'src/components/Input'
import authApi from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'

import path from 'src/constants/path'

type FormData = Pick<Schema, 'email' | 'password'>

const loginSchema = schema.pick(['email', 'password'])

function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    // event?.preventDefault()
    // const body = omit(data, ['confirm_password'])

    console.log('hehe')

    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
        // console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorRepsonse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          // if (formError) {
          //   Object.keys(formError).forEach((key) => {
          //     setError(key as keyof Omit<FormData, 'confirm_password'>, {
          //       message: formError[key as keyof Omit<FormData, 'confirm_password'>],
          //       type: 'Server'
          //     })
          //   })
          // }
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div>Đăng nhập</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                name='email'
                autoComplete='on'
                errorMessage={errors.email?.message}
                register={register}
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Password'
                name='password'
                autoComplete='on'
                errorMessage={errors.password?.message}
                register={register}
              />
              <div className='mt-3'>
                <Button
                  isLoading={loginAccountMutation.isLoading}
                  // disabled={loginAccountMutation.isLoading}
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản chưa</span>
                <Link className='ml-1 text-red-400' to={path.register}>
                  Đăng kí
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
