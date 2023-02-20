import { ApplicationCommandOptionType } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { Command } from '../structures/Command';

export default new Command({
	name: 'kiss',
	description: 'kiss somebody',
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: 'target',
			description: 'the user to kiss',
			required: true,
		},
	],
	run: async ({ interaction, args }) => {
		const kissEmbed = new EmbedBuilder()
			.setColor('LuminousVividPink')
			.setTitle(
				`${interaction.user.username} kissed ${
					args.getUser('target')?.username
				} :)`
			)
			.setImage(
				'https://media.tenor.com/aXjYu-OWsa8AAAAd/renko-usami-touhou.gif'
			);
		interaction.followUp({ embeds: [kissEmbed] });
		interaction.channel?.send(`${args.getUser('target')}`);
		// interaction.channel?.send(`${args.getUser('target')}` || 'an invalid user');
		// interaction.followUp(
		// 	`${interaction.user.username} kissed ${args.getUser('target')} :)`
		// );
		// interaction.channel?.send(
		// 	'https://tenor.com/view/renko-usami-touhou-maribel-hearn-gif-22032279'
		// );
	},
});
