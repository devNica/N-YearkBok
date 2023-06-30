import { FastifyInstance } from 'fastify'
import { migrateSeedsHandler, welcomeHandler } from './admin.controller'

async function adminRouter (server: FastifyInstance): Promise<void> {
  server.get('/welcome', welcomeHandler)
  server.get('/migrate', { preHandler: [server.authenticate] }, migrateSeedsHandler)
}

export default adminRouter
