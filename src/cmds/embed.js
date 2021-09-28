module.exports = {
	name: 'embed',
	execute(cl, msg, args) {
		const embed = {
			color: cl.cfg.hexBlue,
			timestamp: new Date(),
			footer: {
				text: `Komenda wywołana przez ${msg.author.tag}`,
				icon_url: cl.cfg.iconurl,
			},
		};
		switch (args[0]) {
			case 'witaj':
				embed.title = 'Witajcie w Gractwie!';
				embed.description =
					'Jesteśmy grupą ludzi których kręcą gry. Proste, nie?\nSerwer ten miał wcześniej tematykę Team Fortressową.';
				embed.footer.text = '#witaj';
				embed.fields = cl.cfg.embedFields.witaj;
				readyMsg = { embeds: [embed] };
				break;
			case 'regulamin':
				embed.title = 'Regulamin';
				embed.description =
					'Regulamin naszego serwera składa się z tego, co następuje:';
				embed.footer.text = `Ostatnio zaktualizowany`;
				embed.fields = cl.cfg.embedFields.regulamin;
				readyMsg = { embeds: [embed] };
				break;
			case 'rolki':
				embed.title = 'Rolki';
				embed.description = '#rolki jest kanałem do przyznawania sobie ról.';
				readyMsg = { embeds: [embed] /*components: [rows]*/ };
				break;
			default:
				embed.title = `zły parametr: ` + args[0];
				embed.color = cl.cfg.hexRed;
				readyMsg = { embeds: [embed] };
				break;
		}
		msg.channel.send(readyMsg);
	},
};
