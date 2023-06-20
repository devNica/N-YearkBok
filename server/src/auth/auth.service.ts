import prisma from "../utils/prisma";
import { hashPassword } from '../utils/hash'
import { CreateUserInputModel } from "../models/auth.model";

export async function createdUser(data: CreateUserInputModel) {
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

