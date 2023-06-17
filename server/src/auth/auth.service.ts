import prisma from "../utils/prisma";
import { CreateUserInput } from "./auth.schema";


export async function createdUser(data: CreateUserInput) {
    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            password: data.password
        }
    })

    return newUser
}