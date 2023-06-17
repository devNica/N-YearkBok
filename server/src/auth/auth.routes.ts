import { FastifyInstance } from 'fastify'
import { registerAuthHandler } from './auth.controller'

async function userRoutes(server: FastifyInstance) {
    server.post('/', registerAuthHandler)
}

export default userRoutes