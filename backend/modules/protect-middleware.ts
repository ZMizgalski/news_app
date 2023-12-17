import { NextFunction, Response } from "express-serve-static-core";
import { Socket } from "socket.io";

import { JWTWorker } from "./jwt-utils";

import { RequestWithJWTPayloadUser } from './models/request-with-user';


const verifyJWTToken = (
	bearer?: string,
	wrongBearer?: () => void,
	wrongToken?: () => void,
	verificationFailed?: () => void
) => {
	if (!bearer) {
		wrongBearer?.();
		return;
	}

	const [, token] = bearer.split('Bearer ');

	if (!token) {
		wrongToken?.();
		return;
	}

	try {
		return JWTWorker.verifyJWT(token);
	} catch (e) {
		verificationFailed?.();
		return;
	}
}

export const authSocketMiddleware = (
	socket: Socket,
	next: () => void
) => {
	const token: string | undefined = socket.handshake?.auth?.token;
	const verifiedUser = verifyJWTToken(token);

	if (verifiedUser) next();
}

export const authProtectMiddleware = (
	req: RequestWithJWTPayloadUser,
	res: Response,
	next: NextFunction
) => {
	req.user = verifyJWTToken(
		req.headers.authorization,
		() => {
			res.status(401);
			res.json({ message: 'not authorized!' });
		},
		() => {
			res.status(401);
			res.json({ message: 'not valid token!' });
		},
		() => {
			res.status(401);
			res.json({ message: 'error' });
		}
	);

	if (req.user) next();
}
