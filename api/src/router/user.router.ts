 import { prisma } from "../../prisma/db.setup";
import { Router } from "express";

const userController = Router();

userController.get("/users", async (req, res) => {
	const users = await prisma.user.findMany()
	res.send(users)
})

export {userController}