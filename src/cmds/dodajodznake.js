module.exports = {
  name: "dodajodznake",
  async execute(cl, msg, args) {
    const { get } = require("https");
    const { createWriteStream, access } = require("fs");
    if (msg.member.permissions.has(0x20)) {
      if (msg.attachments.at(0) != null) {
        console.log("attachmentadded");
        msg.attachments.each((x) => {
          if (x.contentType.startsWith("application/json")) {
            access(`src/badges/json/${x.name}`, (e) => {
              if (!e) {
                const file = createWriteStream(`src/badges/json/${x.name}`);
                get(x.url, (res) => {
                  res.pipe(file);
                });
              } else {
                msg.channel.send("Taka odznaka już istnieje");
              }
            });
          } else if (x.contentType.startsWith("image/")) {
            exists(`src/badges/img/${x.name}`, (e) => {
              if (!e) {
                const file = createWriteStream(`src/badges/img/${x.name}`);
                get(x.url, (res) => {
                  res.pipe(file);
                });
              } else {
                msg.channel.send("Taka odznaka już istnieje");
              }
            });
          }
        });
      }
    }
  },
};