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
					args.getUser('target')?.username || 'a ghost'
				} :)`
			)
			.setImage(
				'https://media.discordapp.net/attachments/594222795999805643/1078363884190183485/ezgif-1-96508f9a03.gif'
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
