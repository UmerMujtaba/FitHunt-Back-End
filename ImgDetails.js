const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  filePath: {
    type: String,
}},{
    collection: "GymInfo"
});
module.exports = ImageModel;
mongoose.model("GymInfo", GymInfoSchema)