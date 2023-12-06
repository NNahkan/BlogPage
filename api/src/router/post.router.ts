import express, { Request } from "express"
import { prisma } from "../../prisma/db.setup"

const postController = express.Router()

postController.get("/", async (req: Request, res) => {
	const categoryName = req.query.cat as string | undefined;
	const posts = await prisma.post.findMany({
		where: categoryName
			? {
				categories: {
					some: {
						name: categoryName,
					},
				},
			}
			: {},
	});

	return res.status(200).json(posts)


})

// postController.get("/id")
// postController.post("/")
// postController.delete("/:id")
// postController.patch("/:id")


export { postController } 