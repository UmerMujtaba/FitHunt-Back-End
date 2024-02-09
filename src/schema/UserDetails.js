const mongoose = require("mongoose");

const UserDetailScheme = new mongoose.Schema({
  id: String,
  name: String,
  mobile: String,
  gender: String,
  age: String,
  email: { type: String, unique: true }, 
  password: String,
},{
    collection: "UserInfo"
});
mongoose.model("UserInfo", UserDetailScheme)