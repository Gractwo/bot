module.exports = {
	name: 'pomoc',
	execute(cl, msg) {
		const embed = {
			color: cl.cfg.hexBlue,
			timestamp: new Date(),
			footer: {
				text: `Komenda wywołana przez ${msg.author.tag}`,
				icon_url: cl.cfg.iconurl,
			},
			title: 'Pomoc!',
			description: cl.cfg.embedFields.pomocDesc,
		};
		msg.channel.send({ embeds: [embed] });
	},
};
