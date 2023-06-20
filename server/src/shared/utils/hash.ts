import argon from 'argon2'

async function hashPassword (password: string): Promise<string> {
  return await argon.hash(password)
}

async function verifyPassword (hashedPassword: string, password: string): Promise<boolean> {
  return await argon.verify(hashedPassword, password)
}

export {
  hashPassword,
  verifyPassword
}
