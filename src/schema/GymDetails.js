const mongoose = require("mongoose");

const GymInfoSchema = new mongoose.Schema({
  name: String,
  fee: String,
  mobile: String,
  location: String,
  maletime: String,
  femaletime : String,
  image_url: String
},{
    collection: "GymInfo"
}); 
 
mongoose.model("GymInfo", GymInfoSchema)