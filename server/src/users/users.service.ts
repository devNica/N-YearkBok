import { AddPersonalInfoInputModel } from "../models/users.model"
import prisma from "../utils/prisma"

export async function insertPersonalInfo(data: AddPersonalInfoInputModel & { userId: string}) {
    const info = await prisma.personalInfo.create({ data })
    return info
}

export async function findAllUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            phoneNumber: true,
            createdAt: true
        }
    })
    return users
}