import DiscordJS from 'discord.js';
// import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import config from './cfg.json';
dotenv.config();

const client = new DiscordJS.Client({
	intents: [DiscordJS.GatewayIntentBits.Guilds],
});
const app = express();
const port = process.env.PORT || config.api.fallbackPort;

app.get('/', (req, res) => {
	res.sendStatus(200);
});
app.get('/members', (req, res) => {
	res.send(
		client.guilds.resolve(config.api.memberCountGuildId)?.memberCount.toString()
	);
});

client.on('ready', () => {
	console.log(`BOT: Now logged in as ${client.user?.tag}.`);
});

const api = app.listen(port, () => {
	console.log(`API: Now listening on :${port}.`);
});
client.login(process.env.TOKEN);
