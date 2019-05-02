const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String
}, {
  timestamps: true
});



const User = mongoose.model("User", userSchema);  //Make user singular and uppercase always, mongoose automatically changes it to plural and lower case -marcos

module.exports = User;

