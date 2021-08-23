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
	console.log('a message has been received');
	if (!msg.content.startsWith(cfg.prefix) || msg.author.bot) return;

	const args = msg.content.slice(cfg.prefix.length).trim().split(/ +/);
	const cmdName = args.shift().toLowerCase();

	if (!cl.cmds.has(cmdName)) return;
	const cmd = cl.cmds.get(cmdName);

	try {
		cmd.execute(msg);
	} catch (error) {
		console.error(error);
		message.reply(`the above error occured while trying to execute ${cmd}`);
	}
});

cl.once('ready', () => {
	console.clear();
	console.log(`bot ready; logged in as ${cl.user.tag}\n--`);
	cl.user.setActivity('.ping', { type: 'LISTENING' });
});

cl.login(process.env.token);
