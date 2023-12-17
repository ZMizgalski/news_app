import { Server, ServerOptions } from 'socket.io';

import { config } from './config';


const socketConfig: Partial<ServerOptions> = {
	cors: {
		origin: 'http://localhost:4200'
	}
};

const io = new Server(config.stage === 'local' ? socketConfig : {});

export default io;
