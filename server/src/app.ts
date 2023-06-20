import { server } from "./configs/server.config"
import { coreSchemas } from "./models"


async function main(){

    for (const schema of coreSchemas) {
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