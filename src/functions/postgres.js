const { lvl } = require("./tools");

module.exports = {
  messageCount: async function (connect, userID) {
    query = `UPDATE users SET msg_count = msg_count + 1 WHERE users.user_id = '${userID}'`;
    await connect.query(query);
  },
  addExp: async function (connect, userID) {
    let query = `SELECT users.user_id, users.exp FROM users WHERE users.user_id = '${userID}'`;
    const check = await connect.query(query);
    if (check.rowCount == 0) {
      query = `INSERT INTO users(user_id,msg_count,exp) VALUES ('${userID}',1,${Math.floor(
        Math.random() * 25
      )})`;
      await connect.query(query);
    } else {
      let exp = check.rows[0].exp + Math.floor(Math.random() * 25);
      console.debug(lvl(exp));
      query =
        query = `UPDATE users SET exp =  ${exp},msg_count = msg_count + 1,lvl = ${lvl(
          exp
        )} WHERE users.user_id = '${userID}'`;
      await connect.query(query);
    }
  },
  profil: async function (connect, userID) {
    let query = `SELECT * FROM users WHERE users.user_id = '${userID}'`;
    const check = await connect.query(query);
    if (check.rowCount == 0) {
      query = `INSERT INTO users(user_id) VALUES ('${userID}')`;
      await connect.query(query);
    }
    return check.rows;
  },
  addBadge: async function (args) {},
  giveBadge: async function (args) {},
};
