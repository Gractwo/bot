declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string;
			DEVTOKEN: string;
			PORT: string;
			ENVIRONMENT: 'prod' | 'dev';
		}
	}
}

export {};
