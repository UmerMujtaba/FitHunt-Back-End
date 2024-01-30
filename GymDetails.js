const mongoose = require("mongoose");

const GymInfoSchema = new mongoose.Schema({
  name: String,
  fee: String,
  mobile: String,
  location: String
},{
    collection: "GymInfo"
});

mongoose.model("GymInfo", GymInfoSchema)