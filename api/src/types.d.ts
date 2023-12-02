import { User } from "@prisma/client";

declare global {
	namespace Express {
		interface Request {
			user: any
		}
	}

	namespace NodeJS {
		export interface ProcessEnv {
			DATABASE_URL: string;
			JWT_SECRET_KEY: string;
		}
	}
}