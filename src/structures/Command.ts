import { CommandType } from '../typings/Command';

class Command {
	constructor(commandOptions: CommandType) {
		Object.assign(this, commandOptions);
	}
}

export { Command };
