require('dotenv').config();
const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log(
		'-------------------------------------\nTHE BOT IS READY TO GO.\n-------------------------------------'
	);
	client.user.setActivity('.ping', { type: 'LISTENING' });
});

client.on('message', (message) => {
	/* OMITTING THE COMMAND HANDLER TO CATCH ANY AND ALL MESSAGES IN THE '#rolki' CHANNEL
	MAKING 'tf2' A VIABLE COMMAND WITHOUT A PREFIX */

	if (message.channel.name == 'rolki') {
		if (message.author.bot) return;

		if (
			message.content == 'tf2' ||
			message.content == 'liga' ||
			message.content == 'csgo' ||
			message.content == 'minecraft' ||
			message.content == 'rainbow-six' ||
			message.content == 'apex' ||
			message.content == 'genshin'
		) {
			const role = message.member.guild.roles.cache.find(
				(role) => role.name == message.content
			);
			if (
				message.member.roles.cache.find((role) => role.name == message.content)
			) {
				message.member.roles.remove(role);
				message.delete();
				console.log(
					`removed ${message.author.username}'s ${message.content} role.`
				);
				const removeRolesEmbed = new Discord.MessageEmbed()
					.setTitle(
						`Odebrano Ci rangę ${message.content}, ${message.author.username}.`
					)
					.setColor(config.embedColor)
					.attachFiles('./gractwo.png')
					.setFooter('#rolki', 'attachment://gractwo.png')
					.setTimestamp();
				message.channel
					.send(removeRolesEmbed)
					.then((message) => message.delete({ timeout: 3500 }))
					.catch(console.error);
			} else {
				message.member.roles.add(role);
				message.delete();
				console.log(
					`added ${message.content} role to ${message.author.username}.`
				);
				const addRolesEmbed = new Discord.MessageEmbed()
					.setTitle(
						`Przyznano Ci rangę ${message.content}, ${message.author.username}.`
					)
					.setColor(config.embedColor)
					.attachFiles('./gractwo.png')
					.setFooter('#rolki', 'attachment://gractwo.png')
					.setTimestamp();
				message.channel
					.send(addRolesEmbed)
					.then((message) => message.delete({ timeout: 3500 }))
					.catch(console.error);
			}
		} else {
			if (
				!message.member.roles.cache.find((role) => role.name == 'Moderatorzy')
			) {
				console.log(
					`${message.author.username} spammed the rolki channel with a bad message`
				);
				message.delete();
				const rolkiWrongMessageEmbed = new Discord.MessageEmbed()
					.setTitle(`To nie jest kanał na pisanie, ${message.author.username}`)
					.setColor(config.embedColorFail)
					.attachFiles('./gractwo.png')
					.setFooter('#rolki', 'attachment://gractwo.png')
					.setTimestamp();
				message.channel
					.send(rolkiWrongMessageEmbed)
					.then((message) => message.delete({ timeout: 3500 }))
					.catch(console.error);
				return;
			}
		}
	}

	if (message.content.toLowerCase() === '!rank')
		message.channel.send({
			files: [
				'https://cdn.discordapp.com/attachments/281070649374670849/871103257580281876/tenor.gif',
			],
		});

	// command handler is downward from comment

	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply("I can't execute that command inside DMs!");
	}

	if (command.args && !args.length) {
		return message.channel.send(
			`You didn't provide any arguments, ${message.author}!`
		);
	}

	try {
		command.execute(message, args, Discord, config, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command.');
	}
});

client.login(process.env.BOT_TOKEN).then(() => getStatus());

// Funne API hehehehe
const http = require('http');
const port = process.env.PORT || 3000;

let status;

const getStatus = () => {
	let totalSeconds = process.uptime();
	let realTotalSecs = Math.floor(totalSeconds % 60);
	let days = Math.floor((totalSeconds % 31536000) / 86400);
	let hours = Math.floor((totalSeconds / 3600) % 24);
	let mins = Math.floor((totalSeconds / 60) % 60);
	let used = process.memoryUsage().heapUsed / 1024 / 1024;

	status = {
		username: client.user.username,
		avatar: client.user.avatarURL(),
		status: client.user.presence.status,
		activity:
			client.user.presence.activities.length > 0
				? `${client.user.presence.activities[0].type} ${client.user.presence.activities[0].name}`
				: null,
		members: client.users.cache.size,
		uptime: {
			days,
			hours,
			mins,
			realTotalSecs,
		},
		memory: `${Math.round(used * 100) / 100}MB`,
		ping: `${Math.floor(client.ws.ping)}ms`,
		node: process.version,
	};
};

setInterval(getStatus, 30000);

http
	.createServer(async (req, res) => {
		res.statusCode = 200;

		res.write(JSON.stringify(status));
		res.end();
	})
	.listen(port, () => console.log(`Now listening on port ${port}`));
