const mongoose = require("mongoose");
const imageDetailsSchema = new mongoose.Schema({
  image: String
},{
    collection: "GymInfo"
});
module.exports = ImageModel;
mongoose.model("GymInfo", imageDetailsSchema)