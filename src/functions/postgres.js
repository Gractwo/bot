const { lvl, randomExp } = require("./tools");
const { PrismaClient } = require("@prisma/client");
class Postgres {
  constructor() {
    this.client = new PrismaClient();
  }

  async messageCount(userID) {
    return await this.client.users.update({
      where: {
        user_id: userID,
      },
      data: {
        msg_count: {
          increment: 1,
        },
      },
    });
  }

  async profile(userID) {
    return await this.client.users.findUnique({
      where: {
        user_id: userID,
      },
    });
  }

  async msg_state(userID) {
    return await this.client.users.findUnique({
      where: {
        user_id: userID,
      },
    });
  }

  async addExp(userID, min, max) {
    await this.#ifUserExist(userID).then(async () => {
      const rExp = randomExp(min, max);
      return await this.client.users.update({
        where: {
          user_id: userID,
        },
        data: {
          exp: {
            increment: rExp,
          },
          lvl: lvl(
            (
              await this.client.users.findUnique({
                where: {
                  user_id: userID,
                },
                select: {
                  exp: true,
                },
              })
            ).exp
          ),
        },
      });
    });
  }

  async #ifUserExist(userID) {
    if ((await this.profile(userID)) == null) {
      console.log("Account");
      await this.client.users.create({
        data: {
          user_id: userID,
          lvl: 0,
          exp: 0,
        },
      });
    }
  }

  async #ifMsgsExist(userID, channelID) {
    if ((await this.profile(userID)) == null) {
      console.log("Account");
      await this.client.users.create({
        data: {
          user_id: userID,
          lvl: 0,
          exp: 0,
        },
      });
    }
  }

  //addBadge: async function (args) {},
  //giveBadge: async function (args) {},
}
module.exports.Postgres = Postgres;
