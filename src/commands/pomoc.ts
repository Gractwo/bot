import { Command } from '../structures/Command';

export default new Command({
	name: 'pomoc',
	description: 'pokazuje pomocne informacje',
	run: async ({ interaction }) => {
		interaction.followUp('tu będzie komenda z pomocami!');
	},
});
