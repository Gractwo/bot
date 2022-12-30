import { ClientEvents } from 'discord.js';

class Event<Key extends keyof ClientEvents> {
	constructor(
		public event: Key,
		public run: (...args: ClientEvents[Key]) => any
	) {}
}

export { Event };
