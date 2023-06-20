import { authSchemas } from "./auth/auth.schema"
import { server } from "./configs/server.config"


async function main(){

    for (const schema of authSchemas) {
        server.addSchema(schema)
    }

    try {
        await server.listen({port: 7600, host: '0.0.0.0' })
        console.log('Server ready at http://localhost: 7600')
    } catch (error) {
        server.log.error(`Error: ${error}`)
        process.exit(1)
    }
}

main()