import { BotClient } from './structures/Client';
import { MemberCount } from './structures/MemberCount';
import express from 'express';
import cors from 'cors';
import config from './cfg.json';
require('dotenv').config();

const client = new BotClient();
client.boot();

const app = express();
app.use(cors());

const members = new MemberCount();
let port = process.env.PORT || config.api.fallbackPort;

app.get('/', (req, res) => {
	res.sendStatus(200);
});
app.get('/members', (req, res) => {
	res
		.status(members.current ? 200 : 500)
		.send(members.current ? members.current.toString() : 'Server Error');
});
app.listen(port, () => {
	console.log(`API: Now listening on :${port}.`);
});

export { client, app, config, members };
