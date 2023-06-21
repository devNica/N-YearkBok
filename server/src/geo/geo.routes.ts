import { FastifyInstance } from 'fastify'
import { getAllMacroRegionHandler } from './geo.controller'
import { $ref } from '@models/index'

const geoRouter = async (server: FastifyInstance): Promise<void> => {
  server.get('/regions', {
    schema: {
      response: {
        200: $ref('GetRegionInfoResponseModel')
      }
    }
  },
  getAllMacroRegionHandler)
}

export default geoRouter
