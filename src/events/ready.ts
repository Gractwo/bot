import { client, config, members } from '..';
import { Event } from '../structures/Event';

export default new Event('ready', () => {
	console.log(`BOT: Now logged in as ${client.user?.tag}.`);

	// memberCount reporting - for the API
	// ---------------------------------------
	// NOTE: for this to work, bot needs to be
	// member of Gractwo Main Discord Server
	members.setCurrent(
		client.guilds.resolve(config.api.memberCountGuildId)?.memberCount || null
	);
	let intervalSeconds = 5;
	setInterval(() => {
		if (members.previous != members.current) {
			console.log(
				`API/BOT: Gractwo memberCount is ${`now ${members.current}` || 'unset'}`
			);
		}
		members.setPrevious(members.current);
	}, intervalSeconds * 1000);
});
