import { prisma } from "../prisma/db.setup";
import bcrypt from "bcrypt"

const saltRounds = 10

export const encryptPassword = (password: string) => {
	return bcrypt.hashSync(password, saltRounds)
}

 