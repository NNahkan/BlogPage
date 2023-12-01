import { PrismaClient } from "@prisma/client";
import express from "express"
import { userController } from "./router/user.router";
import { authController } from "./router/auth.router";

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.use("/auth",authController)
app.use(userController)

app.listen(3000, () => console.log("Connected"))