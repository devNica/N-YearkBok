/* eslint-disable @typescript-eslint/no-floating-promises */
import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fjwt from '@fastify/jwt'
import authRouter from '@auth/auth.routes'
import userRouter from '@users/users.routes'
import constants from '@shared/constants'
import adminRouter from '../admin/admin.routes'
import geoRouter from '@geo/geo.routes'
import populationRouter from '@population/population.routes'
import fastifyStatic from '@fastify/static'
import path from 'path'
import handlebars from 'handlebars'
import fastifyView from '@fastify/view'

export const server = Fastify({ logger: false })

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any
  }
}

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      id: string
      email: string
    }
  }
}

server.register(fastifyStatic, {
  root: path.join(__dirname, '../public')
})

server.register(fastifyView, {
  engine: {
    handlebars: handlebars.create()
  },
  includeViewExtension: true,
  templates: 'src/views/',
  layout: '/layouts/main.hbs',
  options: {
    partials: {
      header: 'partials/header.hbs'
    }
  }
})

server.register(fjwt, {
  secret: constants.JWT_SECRET
})

server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify()
  } catch (error) {
    return await reply.send(error)
  }
})

server.register(authRouter, {
  prefix: '/auth'
})

server.register(userRouter, {
  prefix: '/users'
})

server.register(adminRouter, {
  prefix: '/admin'
})

server.register(geoRouter, {
  prefix: '/geo'
})

server.register(populationRouter, { prefix: '/population' })
