import { Event } from '../structures/Event';
import { members } from '..';

export default new Event('guildMemberRemove', () => {
	members.decrementCurrent();
});
