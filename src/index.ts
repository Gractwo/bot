import DiscordJS from 'discord.js';
// import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import config from './cfg.json';
dotenv.config();

const client = new DiscordJS.Client({
	intents: [
		DiscordJS.GatewayIntentBits.Guilds,
		DiscordJS.GatewayIntentBits.GuildMembers,
	],
});
const app = express();
const port = process.env.PORT || config.api.fallbackPort;
let memberCount: number | null, previousCount: number | null;

app.get('/', (req, res) => {
	res.sendStatus(200);
});
app.get('/members', (req, res) => {
	res
		.status(memberCount ? 200 : 500)
		.send(memberCount ? memberCount.toString() : 'Server Error');
});

client.on('guildMemberAdd', () => {
	if (memberCount) memberCount++;
});
client.on('guildMemberRemove', () => {
	if (memberCount) memberCount--;
});
client.on('ready', () => {
	console.log(`BOT: Now logged in as ${client.user?.tag}.`);
	memberCount =
		client.guilds.resolve(config.api.memberCountGuildId)?.memberCount || null;
	setInterval(() => {
		if (previousCount != memberCount) {
			console.log(
				`API/BOT: Gractwo memberCount is ${`now ${memberCount}` || 'unset'}.`
			);
		}
		previousCount = memberCount;
	}, 5 * 1000);
});

app.listen(port, () => {
	console.log(`API: Now listening on :${port}.`);
});
client.login(process.env.TOKEN);
