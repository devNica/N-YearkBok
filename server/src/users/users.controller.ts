import { FastifyReply, FastifyRequest } from "fastify";
import { findAllUsers, insertPersonalInfo } from "./users.service";
import { AddPersonalInfoInputModel } from "../models/users.model";


export async function getAllUsersHandler(
    _request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const users = await findAllUsers()
        return reply.code(200).send(users)
    } catch (error) {
        return reply.code(400).send(error.message)
    }
}


export async function addPersonalInfoHandler(
    request: FastifyRequest<{
        Body: AddPersonalInfoInputModel
    }>,
    reply: FastifyReply
) {
    try {
        const body = request.body
        const userId = request.user.id
        console.log('userID: ', userId)
        const info = await insertPersonalInfo({...body, userId })
        return reply.code(201).send({
            fullname: `${info.firstname} ${info.lastname}`
        })
    } catch (error) {
        return reply.code(500).send(error)
    }
}