const discordjs = require("discord.js");
const fs = require("fs");
const { Tedis, TedisPool } = require("tedis");
require("dotenv").config();

const cl = new discordjs.Client({
  intents: [
    discordjs.Intents.FLAGS.GUILDS,
    discordjs.Intents.FLAGS.GUILD_MESSAGES,
    discordjs.Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

//Redis connect
const redis = new Tedis({
  host: "127.0.0.1",
  port: 6379,
  password: process.env.REDIS_TOKEN,
});
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

cl.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(cl.cfg.prefix)) {
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
  console.clear();
  console.log(`bot ready; logged in as ${cl.user.tag}\n--`);
  cl.user.setActivity(".pomoc", { type: "LISTENING" });
});
cl.login(process.env.TOKEN); // here comes the boooy
// hello boy
// welcome
// there he is
// he is here
