import 'dotenv/config'

export default {
  SERVER_PORT: process.env.SERVER_PORT ?? 7800,
  JWT_SECRET: process.env.JWT_SECRET
}
