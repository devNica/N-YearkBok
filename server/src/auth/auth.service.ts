import prisma from "../utils/prisma";
import { CreateUserInput } from "./auth.schema";
import { hashPassword } from '../utils/hash'

export async function createdUser(data: CreateUserInput) {
    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            password: await hashPassword(data.password),
            phoneNumber: data.phoneNumber
        }
    })

    return newUser
}


export async function findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    return user
}