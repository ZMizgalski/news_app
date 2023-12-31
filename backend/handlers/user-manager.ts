import { NextFunction, Request, Response } from "express";

import { PrismaClientHandler } from "./utils/prisma-handler";
import { PasswordWorker } from "../modules/password-utils";
import { JWTWorker } from "../modules/jwt-utils";

import primsa from "../db";


export const UserManager = {
	getAllNews: async (
		req: Request,
		res: Response,
		next: NextFunction
	) => PrismaClientHandler(res, async () => {
		const users = await primsa.new.findMany({
			where: {
				userId: req.params['id']
			},
			select: {
				id: true,
				message: true,
				createdAt: true,
				type: true
			}
		});
	
		res.json(users);
	}),
	register: async (
		req: Request,
		res: Response,
		next: NextFunction
	) => PrismaClientHandler(res, async () => {
		const user = await primsa.user.create({
			data: {
				username: req.body.username,
				password: await PasswordWorker.hashPassword(req.body.password),
				role: req.body.role
			}
		});

		const token = JWTWorker.createJWT(user);

		res.json({ token });
	}),
	login: async (
		req: Request,
		res: Response,
		next: NextFunction
	) => PrismaClientHandler(res, async () => {
		const user = await primsa.user.findUnique({
			where: {
				username: req.body.username
			}
		});

		const isValid = user && await PasswordWorker
			.comparePasswords(
				req.body.password,
				user.password
			);

		if (!isValid) {
			res.status(401);
			res.json({ message: 'wrong credencials '});
			return;
		}

		const token = JWTWorker.createJWT(user);

		res.json({ token });
	})
}
