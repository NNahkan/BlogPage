import { PrismaClient } from "@prisma/client";
import express from "express"
import { userController } from "./router/user.router";
import { authController } from "./router/auth.router";
import { postController } from "./router/post.router";
import cors from "cors"
import cookieParser from "cookie-parser"


const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.use(cors({
	origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
	// allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
}));
app.use(cookieParser())

app.use("/auth", authController)
app.use("/posts", postController)
app.use(userController)

app.listen(3000, () => console.log("Connected"))