import { FastifyReply, FastifyRequest } from 'fastify'
import { migrateSeeds } from './admin.service'

export async function migrateSeedsHandler (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    await migrateSeeds()
    return await reply.code(201).send({ message: 'Migrate successfully!' })
  } catch (error) {
    return await reply.code(400).send(error)
  }
}
