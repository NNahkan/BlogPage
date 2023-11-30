import { PrismaClient } from "@prisma/client";
import express from "express"

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.get("/", async (req, res) => {
	const users = await prisma.user.findMany()
	res.send(users)
})

app.post("/user", async (req, res) => {
	const { name, email } = req.body;
	try {
		const newUser = await prisma.user.create({
			data: {
				name,
				email
			}
		})
		res.status(201).send(newUser)
	} catch (e) {
		console.error(e)
		res.status(500)
	}
})

app.listen(3000, () => console.log("Connected"))