import express from "express"

const postController = express.Router()

postController.get("/", (req, res) => {
	res.json("this is post")
})


export { postController }