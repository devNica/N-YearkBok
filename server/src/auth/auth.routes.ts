import { FastifyInstance } from 'fastify'
import { loginAuthHandler, registerAuthHandler } from './auth.controller'
import { $ref } from '../models'

async function userRoutes(server: FastifyInstance) {
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

    // server.get('/users', {
    //     preHandler: [
    //         server.authenticate
    //     ]
    // },
    //     fetchAllUsers)
}

export default userRoutes