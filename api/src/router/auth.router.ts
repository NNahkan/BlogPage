import { prisma } from "../../prisma/db.setup";
import { Router } from "express";
import "express-async-errors";
import { z } from "zod"
import bcrypt from "bcrypt"
import { validateRequest } from "zod-express-middleware";
import { encryptPassword } from "../auth-utils";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"


const authController = Router();

dotenv.config()

authController.post("/register",
	validateRequest({
		body: z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string().min(8),

		})
	}),
	async (req, res) => {
		const { name, email, password } = req.body;

		const isUser = await prisma.user.findFirst({
			where: {
				email
			}
		})



		if (isUser) {
			return res.status(405).json("This email is already signed")
		}

		const passwordHashed = encryptPassword(password)

		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				passwordHashed,

			}
		})

		res.status(201).send(newUser)



	})
// 
authController.post("/login",
	validateRequest({
		body: z.object({
			email: z.string().email(),
			password: z.string()
		})
	}),
	async (req, res) => {
		console.log("login")
		const { email, password } = req.body;
		const user = await prisma.user.findFirst({
			where: {
				email
			}
		})

		if (!user) {
			return res.status(405).send("Email doesn't exist")
		}

		const isPasswordsMatched = bcrypt.compareSync(password, user.passwordHashed);

		if (!isPasswordsMatched) {
			return res.status(401).json("Password is wrong")
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY!)
		const { passwordHashed, ...rest } = user

		// res.cookie('name', 'geeksforgeeks');
		// res.send("Cookie Set");


		res.cookie("access_token", token, {
			httpOnly: true
		}).status(200).json(rest)

		console.log(rest)



	})

authController.post("logout", async (req, res) => {

})

export { authController }

// after checking password generating jwt , experitation 1 hour,
// token version
// save in cookies