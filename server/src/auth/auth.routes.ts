import { FastifyInstance } from 'fastify'
import { loginAuthHandler, registerAuthHandler } from './auth.controller'
import { $ref } from '@models/index'

async function authRouter (server: FastifyInstance): Promise<void> {
  server.post('/signup',
    {
      schema: {
        body: $ref('SignupRequestModel'),
        response: {
          201: $ref('SignupResponseModel')
        }

      }
    },
    registerAuthHandler)

  server.post('/signin',
    {
      schema: {
        body: $ref('LoginRequestModel'),
        response: {
          200: $ref('LoginResponseModel')
        }
      }
    }, loginAuthHandler)
}

export default authRouter
