import { server } from "../configs/server.config"

interface PayloadModel {
    id: string
    email: string
}

export  function generateToken(payload: PayloadModel): string {
    return server.jwt.sign({ payload })
}