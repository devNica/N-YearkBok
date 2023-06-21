import { FastifyReply, FastifyRequest } from 'fastify'
import { fetchAllMacroRegions, queryOptionType } from './geo.service'

export async function getAllMacroRegionHandler (
  request: FastifyRequest<{
    Querystring: {
      option: queryOptionType
      region: string | undefined
    }
  }>,
  reply: FastifyReply
): Promise<any> {
  try {
    const result = await fetchAllMacroRegions({ ...request.query })
    return await reply.code(200).send(result)
  } catch (error) {
    return await reply.code(500).send(error)
  }
}
