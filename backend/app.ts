import * as dotenv from 'dotenv';

dotenv.config();

import https from 'https';
import fs from 'fs';

import { green, yellow } from 'colors';
import { ConfigType, config } from './config';
import app from './server';


const logResponse = (config: ConfigType) => {
	console.log(yellow('STAGE: %s'), config.stage);
	console.log(green('MESSAGE: starting app on port %s'), config.port);
}

if (config.stage === 'production') {
	app.listen(config.port, () => logResponse(config));
} else {
	https
		.createServer(
			{
				key: fs.readFileSync(__dirname + '/ssl/key.pem'),
				cert: fs.readFileSync(__dirname + '/ssl/ssl.crt'),
				ca: fs.readFileSync(__dirname + '/ssl/ca.crt')
			},
			app)
		.listen(config.port, () => logResponse(config));
}
