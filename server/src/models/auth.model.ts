import { z } from 'zod'

const UserCoreModel = {
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string'
  }).email(),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string'
  })
}

const SignupRequestModel = z.object({
  ...UserCoreModel,
  phoneNumber: z.string({
    required_error: 'Phone number is required',
    invalid_type_error: 'Phone number must be a string'
  })
})

const SignupResponseModel = z.object({
  id: z.string().uuid(),
  email: z.string().email()
})

const LoginRequestModel = z.object({
  ...UserCoreModel
})

const LoginResponseModel = z.object({
  id: z.string().uuid(),
  accessToken: z.string()
})

export type CreateUserInputModel = z.infer<typeof SignupRequestModel>

export interface UserOutputModel {
  id: string
  email: string
  password: string
  phoneNumber: string
  createdAt: Date
}

export interface CreatedUserOutputModel extends Omit<UserOutputModel, 'password' | 'phoneNumber' | 'createAt'> { }

export type LoginInputModel = z.infer<typeof LoginRequestModel>

export const authModels = {
  SignupRequestModel,
  SignupResponseModel,
  LoginRequestModel,
  LoginResponseModel
}
