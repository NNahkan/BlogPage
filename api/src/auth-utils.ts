import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/db.setup";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const saltRounds = 10


export const encryptPassword = (password: string) => {
	return bcrypt.hashSync(password, saltRounds)
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let token = req.header("Authorization")

		if (!token) {
			return res.status(403).send("Access Denied")
		}

		if (token.startsWith("Bearer ")) {
			token = token.split(" ")[1]
		}

		const verified = jwt.verify(token, process.env.JWT_SECRET_KEY!)

		req.user = verified
		next();

	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error."

		res.status(500).json({ error: message })
	}

}

