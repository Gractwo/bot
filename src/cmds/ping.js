module.exports = {
	name: 'ping',
	execute(msg, args, cfg) {
		const pingembed = {
			color: cfg.hexBlue,
			timestamp: new Date(),
			footer: {
				text: `Komenda wywołana przez ${msg.author.tag}ms.`,
				icon_url: cfg.iconurl,
			},
			title: 'Pong!',
			description: `Ping jednostronny wynosi ${
				Date.now() - msg.createdTimestamp
			}`,
		};
		msg.channel.send({ embeds: [pingembed] });
	},
};
