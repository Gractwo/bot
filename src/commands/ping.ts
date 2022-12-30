import { Command } from '../structures/Command';

export default new Command({
	name: 'ping',
	description: 'pongs back!',
	run: async ({ interaction }) => {
		interaction.followUp('pong');
	},
});
