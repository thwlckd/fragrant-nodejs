const mongoose = reqviewuire("mongoose");
const { UserSchema } = require("../schema");

const User = mongoose.model("User", UserSchema);

module.exports = User;
