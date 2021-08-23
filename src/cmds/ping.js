module.exports = {
	name: 'ping',
	execute(msg, args, cfg) {
		const pingembed = {
			color: cfg.hexBlue,
			title: `ping`,
			timestamp: new Date(),
			description: `Pong! ${Date.now() - msg.createdTimestamp}`,
		};
		msg.channel.send(`pong`);
		msg.channel.send({ embeds: [pingembed] });
	},
};
