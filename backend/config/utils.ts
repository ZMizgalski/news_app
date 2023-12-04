import { EnvConfigTypes } from "./consts";


export type EnvConfigType = typeof EnvConfigTypes[number];

export interface EnvConfig {
	port?: string | number
}

const isEnvConfigType = (str: string): str is EnvConfigType => {
	return !!EnvConfigTypes.find((type) => str === type);
}

export const PickEnvConfig = (envConfigType?: string): EnvConfig => {
	if (!envConfigType || !isEnvConfigType(envConfigType)) {
		return (require('./configs/local').config as EnvConfig);
	}

	switch (envConfigType) {
		case 'prod':
			return (require('./configs/prod').config as EnvConfig);
		case 'stage':
			return (require('./configs/stage').config as EnvConfig);
	}
}