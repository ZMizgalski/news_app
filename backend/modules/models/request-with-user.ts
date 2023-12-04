import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";


export interface RequestWithJWTPayloadUser extends Request {
	user?: string | JwtPayload
};
