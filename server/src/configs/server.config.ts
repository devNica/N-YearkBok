import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fjwt from '@fastify/jwt'
import userRoutes from '../auth/auth.routes'

export const server = Fastify({logger: true})

server.register(fjwt, { 
    secret: 'dfhsjfhdjhfjdhjf'
})

server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply)=>{
    try {
        await request.jwtVerify()
    } catch (error) {
        return reply.send(error)
    }
})

server.register(userRoutes, {
    prefix: '/auth'
})