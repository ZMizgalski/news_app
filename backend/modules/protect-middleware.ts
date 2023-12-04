import { NextFunction, Response } from "express-serve-static-core";
import { JWTWorker } from "./jwt-utils";
import { RequestWithJWTPayloadUser } from './models/request-with-user';


export const authProtectMiddleware = (
	req: RequestWithJWTPayloadUser,
	res: Response,
	next: NextFunction
) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: 'not authorized!' });
		return;
	}

	const [, token] = bearer.split('Bearer ');

	if (!token) {
		res.status(401);
		res.json({ message: 'not valid token!' });
		return;
	}

	try {
		req.user = JWTWorker.verifyJWT(token);
		next();
	} catch (e) {
		res.status(401);
		res.json({ message: 'error' });
		return;
	}
}
