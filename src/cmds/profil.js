module.exports = {
  name: "profil",
  execute(cl, msg, args, connect) {
    const { profil } = require("../functions/postgres");
    const { MessageEmbed } = require("discord.js");
    async () => {
      const user = profil(connect, msg.author.id);
    };
    console.debug(user);
    /*if (user) {
      const embed = new MessageEmbed()
        .setColor("#F5F5F5")
        .setTitle(msg.author.name)
        .addFields(
          { name: "Regular field title", value: "Some value here" },
          { name: "Regular field title", value: "Some value here" },
          { name: "Regular field title", value: "Some value here" },
          { name: "Regular field title", value: "Some value here" }
        );
    }*/
  },
};
