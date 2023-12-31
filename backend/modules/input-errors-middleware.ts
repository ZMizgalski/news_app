import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";


export const inputErrorsMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);

	if (errors.isEmpty()) {
		next();
	} else {
		res.status(400);
		res.json({ errors: errors.array() });
	}
};
