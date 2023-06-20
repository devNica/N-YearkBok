import prisma from '@shared/utils/prisma'
import { hashPassword } from '@shared/utils/hash'
import { CreateUserInputModel, CreatedUserOutputModel, UserOutputModel } from '@models/auth.model'

export async function createdUser (data: CreateUserInputModel): Promise<CreatedUserOutputModel> {
  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      password: await hashPassword(data.password),
      phoneNumber: data.phoneNumber
    }
  })

  return newUser
}

export async function findUserByEmail (email: string): Promise<UserOutputModel | null> {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  return user
}
