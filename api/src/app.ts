import { PrismaClient } from "@prisma/client";
import express from "express"
import { userController } from "./router/user.router";
import { authController } from "./router/auth.router";
import dotenv from "dotenv";


const prisma = new PrismaClient()

dotenv.config({ path: "../.env" })
const app = express()
app.use(express.json())

app.use("/auth", authController)
app.use(userController)

app.listen(3000, () => console.log("Connected"))