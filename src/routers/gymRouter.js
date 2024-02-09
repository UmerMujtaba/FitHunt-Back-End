const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const gymRouter = express.Router();
require("../schema/GymDetails");
const Gym = mongoose.model("GymInfo");


gymRouter.post("/gymregister", async (req, res) => {
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
            femaletime: femaletime
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

    Gym.find().then((data) => {
      return res.send({ status: "Ok", data: JSON.stringify(data) });
    });

  } catch (error) {
    return res.send({ error: error });
  }
});

module.exports = gymRouter;
