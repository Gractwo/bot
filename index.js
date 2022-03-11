const discordjs = require("discord.js");
const fs = require("fs");
const redis = require("./src/functions/redis");
const { createClient } = require("redis");
const { connect } = require("http2");
require("dotenv").config();

const cl = new discordjs.Client({
  intents: [
    discordjs.Intents.FLAGS.GUILDS,
    discordjs.Intents.FLAGS.GUILD_MESSAGES,
    discordjs.Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

const redisConnection = createClient({
  url: process.env.REDIS_TOKEN,
});
redisConnection.connect();
cl.cfg = require("./cfg.json");
cl.cmds = new discordjs.Collection();

const cmdsFls = fs
  .readdirSync(`./src/cmds`)
  .filter((file) => file.endsWith(`.js`));
for (const Fl of cmdsFls) {
  const cmd = require(`./src/cmds/${Fl}`);
  console.log(`command: ` + cmd.name);
  cl.cmds.set(cmd.name, cmd);
}

cl.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(cl.cfg.prefix)) {
    if (await redis.expCheck(msg.author.id, redisConnection)) {
    }
  }
  const args = msg.content.slice(cl.cfg.prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();

  if (!cl.cmds.has(cmdName)) return;
  const cmd = cl.cmds.get(cmdName);

  try {
    cmd.execute(cl, msg, args);
  } catch (error) {
    console.error(
      `msgCommand error: ${cmdName} with args ${args} by ${msg.author.tag}\n--\n${error}\n--`
    );
    msg.reply(
      `An error occured while trying to execute ${cmdName} with args ${args}`
    );
    console.log(error);
    return;
  }
  console.log(`msgCommand: ${cmdName + args} by ${msg.author.tag}`);
});

cl.once("ready", () => {
  console.log(`bot ready; logged in as ${cl.user.tag}\n--`);
  cl.user.setActivity(".pomoc", { type: "LISTENING" });
});
cl.login(process.env.TOKEN); // here comes the boooy
// hello boy
// welcome
// there he is
// he is here
