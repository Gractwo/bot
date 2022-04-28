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

  async addExp(userID, min, max) {
    await this.#ifExist(userID).then(async () => {
      const rExp = randomExp(min, max);
      return await this.client.users.update({
        where: {
          user_id: userID,
        },
        data: {
          msg_count: {
            increment: 1,
          },
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
  async #ifExist(userID) {
    if ((await !this.profile(userID)) == null) {
      await this.client.users.create({
        data: {
          user_id: userID,
          msg_count: 0,
          lvl: 0,
        },
      });
    }
  }

  //addBadge: async function (args) {},
  //giveBadge: async function (args) {},
}
module.exports.Postgres = Postgres;
