module.exports = {
	name: 'ping',
	execute(msg, args, cfg) {
		const pingembed = {
			color: cfg.hexBlue,
			timestamp: new Date(),
			footer: {
				text: `Komenda wywołana przez ${msg.author.tag}`,
				icon_url: cfg.iconurl,
			},
			title: 'Pong!',
			description: `Ping jednostronny wynosi ${
				Date.now() - msg.createdTimestamp
			}ms.`,
		};
		msg.channel.send({ embeds: [pingembed] });
	},
};
