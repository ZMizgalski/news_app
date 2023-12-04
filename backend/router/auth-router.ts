import { Router } from 'express';
import { body } from 'express-validator';

import { UserManager } from '../handlers/user-manager';
import { inputErrorsMiddleware } from '../modules/input-errors-middleware';


const authRouter = Router();

authRouter.post('/register',
	inputErrorsMiddleware,
	body('username').exists(),
	body('password').exists(),
	UserManager.register
);

authRouter.post('/login',
	inputErrorsMiddleware,
	body('username').exists(),
	body('password').exists(),
	UserManager.login
);

export default authRouter;
