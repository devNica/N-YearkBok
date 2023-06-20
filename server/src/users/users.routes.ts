import { FastifyInstance } from 'fastify'
import { addPersonalInfoHandler, getAllUsersHandler } from './users.controller'
import { $ref } from '@models/index'

async function userRouter (server: FastifyInstance): Promise<void> {
  server.get('/', { preHandler: [server.authenticate] }, getAllUsersHandler)
  server.post('/', {
    preHandler: [server.authenticate],
    schema: {
      body: $ref('AddPersonalInfoRequestModel'),
      response: {
        201: $ref('AddPersonalInfoResponseModel')
      }
    }
  }, addPersonalInfoHandler)
}

export default userRouter
