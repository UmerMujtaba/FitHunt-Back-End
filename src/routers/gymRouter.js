const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const gymRouter = express.Router();
const { uploader, cloudinaryConfig } = require('../config/cloudinaryConfig')
const { multerUploads, dataUri } = require('../middleware/multer') ;
require("../schema/GymDetails");
const Gym = mongoose.model("GymInfo");


gymRouter.post("/gymregister", multerUploads, async (req, res) => {
    let image_url = ""
    const file = dataUri(req).content
    await uploader.upload(file).then((result)=>{
      console.log("Image Uploaded")
      image_url = result.secure_url
    })
    const {name,fee,mobile,location, maletime, femaletime} = req.body;
    const oldUser = await Gym.findOne({name:name})
    if(oldUser){
        return res.send({data: "Gym already exists!!"}) 
    }
    try{
        await Gym.create({
            name: name,
            fee:fee,
            mobile: mobile,
            location: location,
            maletime: maletime,
            femaletime: femaletime,
            image_url: image_url
        })
        res.send({status:"ok",data:"Data Created"})
    }
    catch (error) {
        res.send({status:"error",data: error})
    }
});

gymRouter.post("/gymdata", async (req, res) => {
  const { token } = req.body;
  console.log(req.body) 
  console.log("I am New",token) 
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    await Gym.find().then((data) => {
      return res.send({ status: "Ok", data: JSON.stringify(data) });
    });

  } catch (error) {
    return res.send({ error: error });
  }
});

module.exports = gymRouter;
