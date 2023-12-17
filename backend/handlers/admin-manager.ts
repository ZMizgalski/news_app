import { NextFunction, Request, Response } from "express";

import { PrismaClientHandler } from "./utils/prisma-handler";

import primsa from "../db";

import io from '../socket';


export const AdminManager = {
	sendAdminMessage: async (
		req: Request,
		res: Response,
		next: NextFunction
	) => PrismaClientHandler(res, async () => {
		const user = await primsa.user.findUnique({
			where: {
				id: req.body.recieverId
			}
		});

		if (!user) {
			res.status(401);
			res.json({ message: `User with id: ${req.body.recieverId} not found`});
			return;
		}

		const newMessage = await primsa.new.create({
			data: {
				message: req.body.message,
				type: req.body.type,
				userId: user.id
			}
		});

		io.to(user.id).emit('message', newMessage);

		res.json(newMessage);
	}),
	getAllUsers: async (
		req: Request,
		res: Response,
		next: NextFunction
	) => PrismaClientHandler(res, async () => {
		const users = await primsa.user.findMany({
			where: {
				role: 'user'
			},
			select: {
				id: true,
				createdAt: true,
				username: true
			}
		});

		res.json(users);
	})
}
