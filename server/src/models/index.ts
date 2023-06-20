import { buildJsonSchemas } from "fastify-zod";
import { authModels } from "./auth.models";


export const { schemas: coreSchemas, $ref} = buildJsonSchemas({
  ...authModels
})