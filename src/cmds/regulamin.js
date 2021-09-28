module.exports = {
	name: 'regulamin',
	execute(cl, msg) {
		const embed = {
			color: cl.cfg.hexBlue,
			timestamp: new Date(),
			footer: {
				text: `Komenda wywołana przez ${msg.author.tag}`,
				icon_url: cl.cfg.iconurl,
			},
			title: 'Regulamin',
			description: 'Regulamin naszego serwera składa się z tego, co następuje:',
			fields: cl.cfg.embedFields.regulamin,
		};
		msg.channel.send({ embeds: [embed] });
	},
};
