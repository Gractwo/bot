module.exports = {
  expCheck: async function (userID, connect) {
    date = new Date();
    const user = await connect.get(userID);
    if (user == null) {
      await connect.set(userID, date.getTime());
      return true;
    } else {
      date = await connect.get(userID);
      const currentDate = new Date();
      if (currentDate.getTime() - date > 60000) {
        await connect.set(userID, currentDate.getTime());
        return true;
      } else {
        return false;
      }
    }
  },
};
