import { CommandInteractionOptionResolver } from 'discord.js';
import { client } from '..';
import { Event } from '../structures/Event';
import { BotInteraction } from '../typings/Command';

export default new Event('interactionCreate', async (interaction) => {
	if (interaction.isCommand()) {
		await interaction.deferReply();
		const command = client.commands.get(interaction.commandName);
		if (!command)
			return interaction.followUp("This command doesn't exist. Dork.");
		command.run({
			args: interaction.options as CommandInteractionOptionResolver,
			client,
			interaction: interaction as BotInteraction,
		});
	}
});
