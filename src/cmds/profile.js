module.exports = {
  name: "profile",
  async execute(cl, msg, args, connect) {
    const { roundRect, expThreshold } = require("../functions/tools");
    const canvas = require("canvas");
    await connect
      .profile(msg.author.id)
      .then((user) => {
        canvas.registerFont("./src/fonts/Lexend-Bold.ttf", {
          family: "LexendBold",
        });
        canvas.registerFont("./src/fonts/Lexend-Thin.ttf", {
          family: "LexendThin",
        });
        const canva = canvas.createCanvas(1024, 256);
        let context = canva.getContext("2d");
        context.fillStyle = "#484848";
        roundRect(context, 0, 0, 1024, 256, 25);
        context.fill();
        context.font = '48px "LexendBold"';
        context.fillStyle = "#FFFFFF";
        context.fillText(msg.author.tag, 244, 24 + 48);
        context.fillText("Lvl " + user.lvl, 850, 24 + 48);
        context.font = '25px "LexendThin"';
        context.fillText(user.msg_count + " messages sent", 244, 72 + 25);
        context.font = '24px "LexendThin"';
        context.fillText(expThreshold(user.lvl + 1) + " exp", 810, 164 + 24);
        context.fillText(user.exp + " exp", 250, 164 + 24);
        context.fillStyle = "#242424";
        roundRect(context, 244, 200, 700, 30, 50);
        context.fill();
        context.fillStyle = "#61F2EA";
        roundRect(
          context,
          244,
          200,
          700 *
            ((user.exp - expThreshold(user.lvl)) / expThreshold(user.lvl + 1)),
          30,
          50
        );
        context.fill();
        roundRect(context, 34, 34, 188, 188, 100);
        canvas
          .loadImage(msg.author.avatarURL({ format: "png" }))
          .then((image) => {
            context.clip();
            context.drawImage(image, 34, 34, 188, 188);
            msg.reply({
              files: [canva.toBuffer()],
            });
          });
      })
      .catch((err) => console.error(err.stack));
  },
};
