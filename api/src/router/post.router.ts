import express, { Request, Response } from "express"
import { prisma } from "../../prisma/db.setup"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


const postController = express.Router()
dotenv.config()


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
			},
			categories: {
				select: {
					name: true
				}
			}
		}
	})

	if (!post) {
		return res.status(401).json("Post doesn't exist")

	}
 	const {
		author: { name: name, image: userImage },
		categories: [{ name: categoryName }],
		...rest
	} = post
	res.status(200).json({
		name, userImage,
		categoryName,
		...rest
	})

})
// postController.post("/")
postController.delete("/:id", async (req: Request, res: Response) => {
	const token = req.cookies.access_token;

	if (!token) {
		return res.status(401).json("Not authenticated!");
	}

	try {
		const userInfo = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: number, iat: number };
		const postId = req.params.id;
		const deletedPost = await prisma.post.delete({
			where: {
				id: +postId,
				authorId: userInfo.id
			}
		});

		if (deletedPost) {
			return res.status(200).json("Post has been deleted!");
		} else {
			return res.status(404).json("Post not found!");
		}
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(403).json("Token is not valid!");
		} else {
			return res.status(500).json("Internal Server Error");
		}
	}
});
// postController.put("/:id")


export { postController } 