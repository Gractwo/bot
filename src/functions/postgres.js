const { lvl, randomExp } = require("./tools");

module.exports = {
  messageCount: async function (connect, userID) {
    const update = await connect.users.update({
      where: {
        user_id: userID,
      },
      data: {
        msg_count: {
          increment: 1,
        },
      },
    });
    return update;
  },
  profile: async function (connect, userID) {
    return await connect.users.findUnique({
      where: {
        user_id: userID,
      },
    });
  },
  addExp: async function (connect, userID, min, max) {
    const rExp = randomExp(min, max);
    return await connect.users.upsert({
      where: {
        user_id: userID,
      },
      create: {
        user_id: userID,
        msg_count: 1,
        exp: randomExp(min, max),
        lvl: 0,
      },
      update: {
        msg_count: {
          increment: 1,
        },
        exp: {
          increment: rExp,
        },
        lvl: lvl(
          (
            await connect.users.findUnique({
              where: {
                user_id: userID,
              },
              select: {
                exp: true,
              },
            })
          ).exp + rExp
        ),
      },
    });
  },
  addBadge: async function (args) {},
  giveBadge: async function (args) {},
};
