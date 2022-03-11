module.exports = {
  messageCount: async function (connect, userID) {
    query = `UPDATE users SET msg_count = msg_count + 1 WHERE users.user_id = '${userID}'`;
    await connect.query(query);
  },
  addExp: async function (connect, userID) {
    let query = `SELECT users.user_id FROM users WHERE users.user_id = '${userID}'`;
    const check = await connect.query(query);
    if (check.rowCount == 0) {
      query = `INSERT INTO users(user_id,msg_count,exp) VALUES ('${userID}',1,${Math.floor(
        Math.random() * 25
      )},)`;
      await connect.query(query);
    } else {
      query = `UPDATE users SET exp = users.exp + ${Math.floor(
        Math.random() * 25
      )},msg_count = msg_count + 1 WHERE users.user_id = '${userID}'`;
      await connect.query(query);
    }
  },
};
