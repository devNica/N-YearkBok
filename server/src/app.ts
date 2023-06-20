/* eslint-disable @typescript-eslint/no-floating-promises */

import 'reflect-metadata'
import 'source-map-support/register'
import 'module-alias/register'

import { server } from './configs/server.config'
import constants from './shared/constants'
import { coreSchemas } from '@models/index'

const { SERVER_PORT } = constants

function main (): void {
  for (const schema of coreSchemas) {
    server.addSchema(schema)
  }

  try {
    server.listen({ port: SERVER_PORT, host: '0.0.0.0' })
    console.log(`Server ready at port: ${SERVER_PORT}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

main()
