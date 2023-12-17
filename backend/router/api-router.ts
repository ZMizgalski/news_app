import { inputErrorsMiddleware } from './../modules/input-errors-middleware';
import { Router } from "express";
import { body } from 'express-validator';

import { AdminManager } from "../handlers/admin-manager";
import { UserManager } from '../handlers/user-manager';


const apiRouter = Router();

apiRouter.get('/getAllUsers', AdminManager.getAllUsers);

apiRouter.post('/sendMessage',
	inputErrorsMiddleware,
	body('recieverId').exists(),
	body('message').exists(),
	body('type').exists(),
	AdminManager.sendAdminMessage
);

apiRouter.get('/getNews/:id',
	inputErrorsMiddleware,
	UserManager.getAllNews
);

export default apiRouter;
