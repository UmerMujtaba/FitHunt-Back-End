const mongoose = require("mongoose");

const TrainerInfoSchema = new mongoose.Schema({
  name: String,
  age: String,
  email: String,
  mobile: String,
  fee: String,
},{
    collection: "TrainerInfo"
});

mongoose.model("TrainerInfo", TrainerInfoSchema)