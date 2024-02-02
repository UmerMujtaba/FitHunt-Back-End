const express=require("express");
const image=express();
const mongoose=require("mongoose");
image.use(express.json());
const cors =require("gym");
image.use(cors());

//monogo DB connection
const mongoURL =
  "mongodb+srv://umermujtaba16:admin@cluster0.1dnnuhf.mongodb.net/?retryWrites=true&w=majority";


  mongoose
    .connect(monogoURL, {
      UseNewUrlParser: true,
    })
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((e) => console.log(e));

    //importing images
    require("./imageDetails");
    const Images = mongoose.model("GymInfo");

    image.get("/", async(req,res) => {
      res.send("Success!!!!")
    });

    image.listen(5004, () => {
      console.log("Server Started")
    })