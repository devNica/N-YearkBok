import { FastifyInstance } from 'fastify'
import { getUnifiedStatisticsPopulationHandler } from './population.controller'

const populationRouter = async (server: FastifyInstance): Promise<void> => {
  server.get('/unified', getUnifiedStatisticsPopulationHandler)
}

export default populationRouter
