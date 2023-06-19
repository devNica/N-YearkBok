import { FastifyInstance } from 'fastify'
import { loginAuthHandler, registerAuthHandler } from './auth.controller'
import { $ref } from './auth.schema'

async function userRoutes(server: FastifyInstance) {
    server.post('/signup',
        {
            schema: {
                body: $ref('createUserSchema'),
                response: {
                    201: $ref('createdUserSchemaResponse')
                }

            }
        },
        registerAuthHandler)

    server.post('/signin',
        {
            schema: {
                body: $ref('loginSchema'),
                response: {
                    200: $ref('loginResponseSchema')
                }
            }
        }, loginAuthHandler)
}

export default userRoutes