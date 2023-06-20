import prisma from '../utils/prisma'
import { AddPersonalInfoInputModel, AddPersonalInfoOutputModel } from '@models/users.model'
import { UserOutputModel } from '@models/auth.model'

export async function insertPersonalInfo (data: AddPersonalInfoInputModel & { userId: string }): Promise<AddPersonalInfoOutputModel> {
  const info = await prisma.personalInfo.create({ data })
  return info
}

export async function findAllUsers (): Promise<UserOutputModel[] | null> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      password: true,
      phoneNumber: true,
      createdAt: true
    }
  })
  return users
}
