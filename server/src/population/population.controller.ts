import { FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { fetchGnralStatisticsPopulation, queryOptionType } from './population.service'

export async function getUnifiedStatisticsPopulationHandler (
  request: FastifyRequest<{
    Querystring: {
      type: queryOptionType
      min: number
      max: number
      period: number
    }
  }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const result = await fetchGnralStatisticsPopulation({ ...request.query })
    return await reply.code(200).send(result)
  } catch (error) {
    return await reply.code(404).send(error)
  }
}
