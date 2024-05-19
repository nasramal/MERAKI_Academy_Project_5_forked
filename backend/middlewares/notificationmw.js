const notificationmw = (socket, next) => {
    if (socket[0] !== "message") {
      next(new Error("socket MW error"));
    } else {
      next();
    }
  };
  module.exports = notificationmw;
  