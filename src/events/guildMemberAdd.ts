import { Event } from '../structures/Event';
import { members } from '..';

export default new Event('guildMemberAdd', () => {
	members.incrementCurrent();
});
