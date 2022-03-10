module.exports = {
  name: "ping",
  execute(cl, msg) {
    const embed = {
      color: cl.cfg.hexBlue,
      timestamp: new Date(),
      footer: {
        text: `Komenda wywołana przez ${msg.author.tag}`,
        icon_url: cl.cfg.iconurl,
      },
      title: "Pong!",
      description: `Ping jednostronny wynosi ${
        Date.now() - msg.createdTimestamp
      }ms.`,
    };
    msg.channel.send({ embeds: [embed] });
  },
};
