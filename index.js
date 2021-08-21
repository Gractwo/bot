const { Client, Intents } = require('discord.js');
// const cfg = require('./cfg.json');
// const fs = require('fs');
require('dotenv').config();

const cl = new Client({ intents: [Intents.FLAGS.GUILDS] });

// ======== ======== ======== ======== COMMAND HANDLER
// const cmds = [];
// const cmdsFls = fs
// 	.readdirSync(`./commands`)
// 	.filter((file) => file.endsWith(`.js`));
//
// for (const Fl of cmdsFls) {
// 	const cmd = require(`./commands/${Fl}`);
// 	cmds.push(cmd.data.toJSON());
// }

// ======== ======== ======== ======== INTERACTIONS (don't work - require slash command registration)
// cl.on('interactionCreate', async (interaction) => {
// 	if (!interaction.isCommand()) return;
//
// 	const { commandName } = interaction;
//
// 	if (commandName === 'ping') {
// 		await interaction.reply('Pong!');
// 	} else if (commandName === 'beep') {
// 		await interaction.reply('Boop!');
// 	} else if (commandName === 'server') {
// 		await interaction.reply(`This server's name is: ${interaction.guild.name}`);
// 	}
// });

cl.once('ready', () => {
	console.log(`bot ready`);
});

cl.login(process.env.token);
