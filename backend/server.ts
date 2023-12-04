import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { authProtectMiddleware } from './modules/protect-middleware';
import { config } from './config';

import apiRouter from './router/api-router';
import authRouter from './router/auth-router';


const app = express();

if (config.stage === 'local') {
	app.use(cors());
	app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/static'));

app.use('/api', authProtectMiddleware, apiRouter);
app.use('/auth', authRouter);

// app.use('*', (req, res) => {
// 	res.sendFile(__dirname + '/static/index.html');
// });

export default app;
