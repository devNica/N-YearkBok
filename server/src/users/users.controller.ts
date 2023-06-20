import { FastifyReply, FastifyRequest } from 'fastify'
import { findAllUsers, insertPersonalInfo } from './users.service'
import { AddPersonalInfoInputModel } from '@models/users.model'

export async function getAllUsersHandler (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const users = await findAllUsers()
    return await reply.code(200).send(users)
  } catch (error) {
    return await reply.code(400).send(error)
  }
}

export async function addPersonalInfoHandler (
  request: FastifyRequest<{
    Body: AddPersonalInfoInputModel
  }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const body = request.body
    const userId = request.user.id
    const info = await insertPersonalInfo({ ...body, userId })
    return await reply.code(201).send({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      fullname: `${info.firstname} ${info.lastname}`
    })
  } catch (error) {
    return await reply.code(500).send(error)
  }
}
