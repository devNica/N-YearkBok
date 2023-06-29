import { FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify/types/reply'
import { fetchStatisticsPopulation, queryOptionType } from './population.service'
import { domain } from './factory.designer'

export async function getStatisticsPopulationHandler (
  request: FastifyRequest<{
    Querystring: {
      source: domain
      type: queryOptionType
      min: number
      max: number
      period: number
    }
  }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const result = await fetchStatisticsPopulation({ ...request.query })
    return await reply.code(200).send(result)
  } catch (error) {
    return await reply.code(404).send(error)
  }
}
