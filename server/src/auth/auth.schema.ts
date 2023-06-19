import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const userCore = {
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).email(),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    })
}

const createUserSchema = z.object({
    ...userCore,
    phoneNumber: z.string({
        required_error: "Phone number is required",
        invalid_type_error: "Phone number must be a string"
    })
})

const createdUserSchemaResponse = z.object({
    id: z.string().uuid(),
    email: z.string().email()
})

const loginSchema = z.object({
    ...userCore
})

const loginResponseSchema = z.object({
    id: z.string().uuid(),
    accessToken: z.string()
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export type LoginInput = z.infer<typeof loginSchema>

export const { schemas: authSchemas, $ref} = buildJsonSchemas({
    createUserSchema,
    createdUserSchemaResponse,
    loginSchema,
    loginResponseSchema
})