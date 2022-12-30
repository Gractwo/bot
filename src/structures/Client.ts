import {
	ApplicationCommandDataResolvable,
	Client,
	ClientEvents,
	Collection,
	GatewayIntentBits,
} from 'discord.js';
import { CommandType } from '../typings/Command';
import glob from 'glob';
import { promisify } from 'util';
import { RegisterCommandsOptions } from '../typings/Client';
import { Event } from './Event';
import config from '../cfg.json';

// makes file search lib a promise
const globPromise = promisify(glob);

class BotClient extends Client {
	commands: Collection<string, CommandType> = new Collection();

	constructor() {
		super({
			intents: 32767, // all intents!
		});
	}

	boot() {
		this.registerModules();
		this.login(
			// if prod, use main bot token
			process.env.ENVIRONMENT == 'prod'
				? process.env.TOKEN
				: process.env.DEVTOKEN
		);
	}

	async importFile(filePath: string) {
		return (await import(filePath))?.default;
	}

	async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
		if (guildId) {
			// register in guild
			this.guilds.cache.get(guildId)?.commands.set(commands);
		} else {
			// register globally
			this.application?.commands.set(commands);
		}
	}

	async registerModules() {
		const slashCommands: ApplicationCommandDataResolvable[] = [];
		const commandFiles = await globPromise(
			`${__dirname}/../commands/*{.ts,.,js}`
		);
		commandFiles.forEach(async (filePath) => {
			const command: CommandType = await this.importFile(filePath);
			if (!command.name) return;
			this.commands.set(command.name, command);
			slashCommands.push(command);
		});

		this.on('ready', () => {
			this.registerCommands({
				commands: slashCommands,
				guildId: config.dsc.slashCmdTestGuildId,
			});
			// if prod, register global commands
			if (process.env.ENVIRONMENT == 'prod') {
				this.registerCommands({
					commands: slashCommands,
				});
			}
		});

		const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
		eventFiles.forEach(async (filePath) => {
			const event: Event<keyof ClientEvents> = await this.importFile(filePath);
			this.on(event.event, event.run);
		});
	}
}

export { BotClient };
