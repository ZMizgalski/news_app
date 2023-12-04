import { User } from './models/user';
import jwt from 'jsonwebtoken';


export const JWTWorker = {
	createJWT: (user: User) => jwt.sign(
		{
			id: user.id,
			username: user.username
		},
		process.env.JWT_SECRET!,
		{
			expiresIn: '1 day'
		}
	),
	verifyJWT: (token: string) => jwt.verify(token, process.env.JWT_SECRET!)
}
