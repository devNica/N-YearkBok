import { buildJsonSchemas } from "fastify-zod";
import { authModels } from "./auth.model";
import { userModels } from "./users.model";


export const { schemas: coreSchemas, $ref} = buildJsonSchemas({
  ...authModels,
  ...userModels
})