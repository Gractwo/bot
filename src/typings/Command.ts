import {
	ChatInputApplicationCommandData,
	CommandInteraction,
	CommandInteractionOptionResolver,
	GuildMember,
	PermissionResolvable,
} from 'discord.js';
import { BotClient } from '../structures/Client';

interface BotInteraction extends CommandInteraction {
	member: GuildMember;
}

interface RunOptions {
	client: BotClient;
	interaction: BotInteraction;
	args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

type CommandType = {
	userPermissions?: PermissionResolvable[];
	run: RunFunction;
} & ChatInputApplicationCommandData;

export { CommandType, BotInteraction };
