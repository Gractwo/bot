const { Message } = require('discord.js');

module.exports = {
	name: 'admin',
	description: 'Ukryte rzeczy dla adminów. Tajne sprawy.',
	args: false,
	guildOnly: true,
	execute(msg, args, Discord, config, client) {
		if (msg.member.roles.cache.find((role) => role.name == 'moderacja')) {
			msg.delete();
			switch (args[0]) {
				case 'witaj': {
					const witajEmbed = new Discord.MessageEmbed()
						.setTitle('Witajcie w Gractwie!')
						.setDescription(
							'Jesteśmy grupą ludzi, których kręcą gry. Proste, nie?\nSerwer ten miał wcześniej tematykę Team Fortressową.'
						)
						.setColor(config.embedColor)
						.addField(
							'Zasady',
							'Zasady serwera są spisane na kanale `#regulamin`. Pamiętajcie, by tam zajrzeć.'
						)
						.addField('Gractwo WWW', '`gractwo.pl`')
						.addField(
							'Gractwo DISCORD',
							'`gractwo.pl/discord` lub `gractwo.pl/dc` lub `discord.gg/NBXq95C`'
						)
						.addField(
							'Gractwo FACEBOOK',
							'`gractwo.pl/facebook` lub `gractwo.pl/fb` lub `facebook.com/groups/gractwo`'
						)
						.attachFiles('./gractwo.png')
						.setFooter('#witaj', 'attachment://gractwo.png')
						.setTimestamp();
					msg.channel.send(witajEmbed);
					break;
				}
				case 'rolki': {
					const rolkiEmbed = new Discord.MessageEmbed()
						.setTitle('Nadawanie Ról')
						.setDescription(
							'#rolki jest kanałem do przyznawania sobie ról.\nDostępne role: `tf2`, `liga`, `csgo`, `minecraft`, `rainbow-six`, `apex`, `genshin`.\n\nRole te służą do pingowania na poszczególnych kanałach, by zebrać ludzi chętnych do gry bądź zainteresowanych pewnym wydarzeniem.\n\nBy przydzielić sobie rolę, po prostu wpisz ją na czacie! Jest on czyszczony zaraz po. Aby pozbyć się roli, wystarczy wpisać jej nazwę jeszcze raz.'
						)
						.setColor(config.embedColor)
						.attachFiles('./gractwo.png')
						.setFooter('#rolki', 'attachment://gractwo.png')
						.setTimestamp();
					msg.channel.send(rolkiEmbed);
					break;
				}
				case 'botannouncement': {
					const botAnnouncementEmbed = new Discord.MessageEmbed()
						.setTitle('Hej,')
						.setDescription(
							'W ciągu ostatnich trzech dni zostałem stworzony ja - bot Gractwa.'
						)
						.setColor(config.embedColor)
						.addField(
							'Moja funkcja',
							'Zastąpiłem wiadomości na kanałach `#witaj` i `#regulamin`, serwisuję również `#rolki`.'
						)
						.addField(
							'Zmiany',
							`Wraz z moim przybyciem zostało uproszczone nasze logo, w regulaminie czekają na Was dwie nowe zasady (niezbyt restrykcyjne ;3), forma serwera została uproszczona.`
						)
						.addField(
							'Rolki? Co?',
							`Rolki To!\n\nMogą one być wykorzystywane do zbierania osób do grania/rozmów. Było to coś o co poproszono naszą administrację już dawno temu. Dziś jest to już dla Was dostępne!`
						)
						.attachFiles('./gractwo.png')
						.setFooter(`by j4mesen`, 'attachment://gractwo.png')
						.setTimestamp();
					msg.channel.send(botAnnouncementEmbed);
					break;
				}
				case 'riposta': {
					msg.channel.send('mama twoja');
					break;
				}
				case 'everyone': {
					msg.channel.send(`@everyone`);
					break;
				}
				default: {
					msg.reply('nie sprecyzowałeś!');
					break;
				}
			}
		} else {
			msg.reply('chyba nie masz na to wystarczających permisji.');
		}
	},
};
