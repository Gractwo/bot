const { Client, Intents, Collection } = require('discord.js');
const cfg = require('./cfg.json');
const fs = require('fs');
require('dotenv').config();

const cl = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
cl.cmds = new Collection();

const cmdsFls = fs
	.readdirSync(`./src/cmds`)
	.filter((file) => file.endsWith(`.js`));
for (const Fl of cmdsFls) {
	const cmd = require(`./cmds/${Fl}`);
	console.log(`command: ` + cmd.name);
	cl.cmds.set(cmd.name, cmd);
}

cl.on('messageCreate', (msg) => {
	if (!msg.content.startsWith(cfg.prefix) || msg.author.bot) return;

	const args = msg.content.slice(cfg.prefix.length).trim().split(/ +/);
	const cmdName = args.shift().toLowerCase();

	if (!cl.cmds.has(cmdName)) return;
	const cmd = cl.cmds.get(cmdName);

	try {
		cmd.execute(msg);
	} catch (error) {
		console.error(
			`msgCommand error: ${cmdName} by ${msg.author.tag}\n--\n${error}\n--`
		);
		msg.reply(`An error occured while trying to execute ${cmdName}`);
		return;
	}
	console.log(`msgCommand: ${cmdName} by ${msg.author.tag}`);
});

cl.once('ready', () => {
	console.clear();
	console.log(`bot ready; logged in as ${cl.user.tag}\n--`);
	cl.user.setActivity('.ping', { type: 'LISTENING' });
});

cl.login(process.env.token);
