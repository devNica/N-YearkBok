import { FastifyInstance } from 'fastify'
import { getStatisticsPopulationHandler } from './population.controller'

const populationRouter = async (server: FastifyInstance): Promise<void> => {
  server.get('/', getStatisticsPopulationHandler)
}

export default populationRouter
