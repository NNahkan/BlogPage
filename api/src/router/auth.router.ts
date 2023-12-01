import { prisma } from "../../prisma/db.setup";
import { Router } from "express";
import "express-async-errors";
import { z } from "zod"
import bcrypt from "bcrypt"
import { validateRequest } from "zod-express-middleware";
import { encryptPassword } from "../auth-utils";


const authController = Router();



authController.post("/signIn",
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

		// console.log(email)


		if (isUser) {
			return res.status(405).json({ message: "This email is already signed" })
		}

		const passwordHashed = encryptPassword(password)

		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				passwordHashed,
			}
		})

		res.status(201).send("User created")



	})

authController.get("/login",
	validateRequest({
		body: z.object({
			email: z.string().email(),
			password: z.string()
		})
	}),
	async (req, res) => {
		const { email, password } = req.body;
		const userHashedPassword = await prisma.user.findFirst({
			where: {
				email
			},
			select: {
				passwordHashed: true
			}
		}).then(result => result?.passwordHashed)

		if (!userHashedPassword) {
			return res.status(405).send("Email doesn't exist")
		}

		const isPasswordsMatched = bcrypt.compareSync(password, userHashedPassword);

		if (!isPasswordsMatched) {
			res.status(401).send("Password is wrong")
		}

		res.status(200).send("You did it so far")

	})

export { authController }