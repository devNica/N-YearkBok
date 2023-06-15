import Fastify from 'fastify'

const server = Fastify({logger: true})

server.get('/test', async function(_request, response){
    return {
        message: 'Server is ok!'
    }
})

server.get('/*', async function(_req, res){
    res.status(400).send({ message: 'page not found'})
})

async function main(){
    try {
        await server.listen(3000, '0.0.0.0')
        console.log('Server ready at http://localhost: 3000')
    } catch (error) {
        server.log.error(`Error: ${error}`)
        process.exit(1)
    }
}

main()