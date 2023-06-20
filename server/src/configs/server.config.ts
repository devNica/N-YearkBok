import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fjwt from '@fastify/jwt'
import authRouter from '../auth/auth.routes'
import userRouter from '../users/users.routes'

export const server = Fastify({ logger: false })

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any
    }
}

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            id: string,
            email: string
        }
    }
}

server.register(fjwt, {
    secret: 'dfhsjfhdjhfjdhjf'
})

server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify()
    } catch (error) {
        return reply.send(error)
    }
})

server.register(authRouter, {
    prefix: '/auth'
})

server.register(userRouter, {
    prefix: '/users'
})