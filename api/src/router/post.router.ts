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

postController.get("/:id", async (req, res) => {
	const post = await prisma.post.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			author: {
				select: {
					name: true,
					image: true
				}
			}
		}
	})

	if (!post) {
		return res.status(401).json("Post doesn't exist")
	}
	const { author: { name: name, image: userImage }, ...rest } = post
	console.log(post)
	res.status(200).json({ name, userImage, ...rest })

})
// postController.post("/")
// postController.delete("/:id")
// postController.put("/:id")


export { postController } 