const {
	MessageActionRow,
	MessageButton,
	ButtonInteraction,
	Interaction,
	Client,
} = require('discord.js');

module.exports = {
	name: 'embed',
	execute(cl, msg, args) {
		// TODO: add a permissions check here to make sure nobody can spawn msgs
		// not intended outside of specific scenarios
		let embed = {
			color: cl.cfg.hexBlue,
			// timestamp: new Date(),
			// footer: {
			// 	text: `Komenda wywołana przez ${msg.author.tag}`,
			// 	icon_url: cl.cfg.iconurl,
			// },
		};

		let readyMsg;

		switch (args[0]) {
			case 'witaj':
				embed.author = {
					name: 'Witajcie w Gractwie!',
					icon_url: 'https://i.imgur.com/4AmRDyX.png',
				};
				embed.description =
					'Jesteśmy grupą ludzi których kręcą gry. Proste, nie?\nSerwer ten miał wcześniej tematykę Team Fortressową.';
				embed.fields = cl.cfg.embedFields.witaj;
				readyMsg = { embeds: [embed] };
				break;
			case 'regulamin':
				embed.title = 'Regulamin';
				embed.description =
					'Regulamin naszego serwera składa się z tego, co następuje:';
				embed.footer = {
					text: `Ostatnio zaktualizowany`,
					icon_url: cl.cfg.iconurl,
				};
				embed.timestamp = new Date();
				embed.fields = cl.cfg.embedFields.regulamin;
				readyMsg = { embeds: [embed] };
				break;
			case 'rolki':
				embed.author = { name: 'Rolki' };
				embed.description = cl.cfg.embedFields.rolkiDesc;
				embed.footer = {
					text: `#witaj`,
					icon_url: cl.cfg.iconurl,
				};
				embed.timestamp = new Date();
				// code responsible for making lists of buttons out of cl.cfg.rolesList
				// & including them in the readyMsg
				let i = 1,
					l = 0;
				let btnList = [];
				while (
					cl.cfg.rolesList.length / 5 +
						(cl.cfg.rolesList.length % 5 != 0 ? 1 : 0) >=
					i
				) {
					let btnRow = new MessageActionRow();
					for (l; l <= 5 * i - 1 && cl.cfg.rolesList[l] != undefined; l++) {
						btnRow.addComponents(
							new MessageButton()
								.setCustomId(cl.cfg.rolesList[l])
								.setLabel(`rolka ${cl.cfg.rolesList[l]}`)
								.setStyle('SECONDARY')
						);
					}
					btnList.push(btnRow);
					console.log(btnList);
					i++;
				}
				readyMsg = { embeds: [embed], components: btnList };
				break;
			default:
				embed.title = `zły parametr: ` + args[0];
				embed.color = cl.cfg.hexRed;
				readyMsg = { embeds: [embed] };
				break;
		}

		msg.channel.send(readyMsg);
		if (args[0] === 'rolki') {
			cl.on('interactionCreate', (inter) => {
				if (!inter.isButton()) return;
				const role = inter.member.guild.roles.cache.find(
					(role) => role.name == inter.customId
				);
				if (!role) return;
				if (
					!inter.member.roles.cache.find((role) => role.name == inter.customId)
				) {
					inter.member.roles.add(role);
					inter
						.reply('Gratulacje, dodalismy ci tą bezużyteczną rangę', {
							timeout: cl.cfg.timeout,
						})
						.then(inter.deleteReply());
				} else {
					inter.member.roles.remove(role);
					inter
						.reply('Gratulacje, odebraliśmy ci tą bezużyteczną rangę', {
							timeout: cl.cfg.timeout,
						})
						.then(inter.deleteReply());
				}
			});
		}
	},
};
