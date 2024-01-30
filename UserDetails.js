const mongoose = require("mongoose");

const UserDetailScheme = new mongoose.Schema({
  username: String,
  mobile: String,
  email: { type: String, unique: true },
  password: String,
},{
    collection: "UserInfo"
});
mongoose.model("UserInfo", UserDetailScheme)