const { nanoid } = require("nanoid");

const shortId = () => {
  return nanoid();
};

module.exports = shortId;
