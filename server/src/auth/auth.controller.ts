import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { createdUser, findAllUsers, findUserByEmail } from "./auth.service";
import { CreateUserInput, LoginInput } from "./auth.schema";
import { verifyPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export async function registerAuthHandler(
    request: FastifyRequest<{
        Body: CreateUserInput
    }>, reply: FastifyReply) {
    try {
        const user = await createdUser(request.body)
        return reply.code(201).send(user)
    } catch (error) {
        console.error(error)
        return reply.code(400).send({ message: error })
    }
}

export async function loginAuthHandler(
    requets: FastifyRequest<{
        Body: LoginInput
    }>,
    reply: FastifyReply
) {
    try {

        const { email, password } = requets.body

        const user = await findUserByEmail(email)

        if (!user) {
            return reply.code(401).send({
                message: "User not found!"
            })
        }

        const verify = await verifyPassword(user.password, password)
        if (!verify) {
            return reply.code(403).send({
                message: "Password is wrong"
            })
        }

        const accessToken = generateToken({ id: user.id, email: user.email })
        console.log(accessToken)
        return reply.code(200).send({
            ...user,
            accessToken
        })
    } catch (error) {
        return reply.code(500).send(error)
    }
}

export async function fetchAllUsers(
    _requets: FastifyRequest,
    reply: FastifyReply
) {
    try {

        const users = await findAllUsers()

        return reply.code(200).send(users)
    } catch (error) {
        return reply.code(500).send(error)
    }
}
