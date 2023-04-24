import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'

import { useMutation } from '@tanstack/react-query'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import authApi from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorRepsonse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'

import path from 'src/constants/path'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })
  console.log(registerAccountMutation.isLoading)

  const onSubmit = handleSubmit((data) => {
    // event?.preventDefault()
    const body = omit(data, ['confirm_password'])

    registerAccountMutation.mutate(body, {
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
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng kí</div>
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
              <Input
                className='mt-2'
                type='password'
                placeholder='Confirmed Password'
                name='confirm_password'
                autoComplete='on'
                errorMessage={errors.confirm_password?.message}
                register={register}
              />

              <div className='mt-3'>
                <Button
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng kí
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản chưa</span>
                <Link className='ml-1 text-red-400' to={path.login}>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
