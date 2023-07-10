const fs = require('fs');

function errorLogger(error, req, res, next) {
  const nowDate = new Date();
  const dateFormat = `${nowDate.getFullYear()}-${
    nowDate.getMonth() + 1
  }-${nowDate.getDate()} ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`;
  const { method } = req;
  const { url } = req;
  const errorContent = error.stack;
  const errorLog = `[${dateFormat}] ${method}:${url}\n${errorContent}\n\n`;

  fs.appendFile('error.log', errorLog, (err) => {
    if (err) {
      console.log(err);
    }
  });
  next(error);
}

module.exports = errorLogger;
