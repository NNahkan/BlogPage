import { PrismaClient } from "@prisma/client";
import express from "express"
import { userController } from "./router/user.router";
import { authController } from "./router/auth.router";
import { postController } from "./router/post.router";
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer"


const prisma = new PrismaClient()

const app = express()

app.use(express.json())

app.use(cors({
	origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
	// allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
}));
app.use(cookieParser())

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../client/public/upload')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname)
	}
})

const upload = multer({ storage })

app.post('/upload', upload.single('file'), function (req, res) {
	const file = req.file!
	res.status(200).json(file.filename)
})

app.use("/auth", authController)
app.use("/posts", postController)
app.use(userController)

app.listen(3000, () => console.log("Connected")) 