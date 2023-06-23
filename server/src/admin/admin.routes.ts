import { FastifyInstance } from 'fastify'
import { migrateSeedsHandler } from './admin.controller'

async function adminRouter (server: FastifyInstance): Promise<void> {
  server.get('/migrate', migrateSeedsHandler)
}

export default adminRouter
