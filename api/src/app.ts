import { PrismaClient } from "@prisma/client";
import express from "express"
import { userController } from "./router/user.router";
import { authController } from "./router/auth.router";
import dotenv from "dotenv";
import { postController } from "./router/post.router";
import cors from "cors"
import cookieParser from "cookie-parser"


const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.use(cors({
	origin: "http://localhost:3001/",
	credentials: true,
}));
app.use(cookieParser())

app.use("/auth", authController)
app.use("/posts", postController)
app.use(userController)

app.listen(3000, () => console.log("Connected"))