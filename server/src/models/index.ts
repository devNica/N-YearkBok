import { buildJsonSchemas } from 'fastify-zod'
import { authModels } from './auth.model'
import { userModels } from './users.model'
import { geoModels } from './geo.model'
import { populationModels } from './population.model'

export const { schemas: coreSchemas, $ref } = buildJsonSchemas({
  ...authModels,
  ...userModels,
  ...geoModels,
  ...populationModels
})
