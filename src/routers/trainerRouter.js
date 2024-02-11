const express = require('express');
const jwt = require("jsonwebtoken");
const trainerRouter = express.Router();
const mongoose = require("mongoose");
require('../schema/TrainerDetails')
const Trainer = mongoose.model("TrainerInfo");

trainerRouter.get("/", (req, res) => {
    res.send({ status: "Started" });
  });


trainerRouter.post("/trainerregister", async (req, res) => {
    const { id,name, age, email,mobile,fee } = req.body;
    console.log(req.body);
  
    const oldUser = await Trainer.findOne({ email: email });
  
    if (oldUser) {
      return res.send({ data: "User already exists!!" });
    }
  
    try {
      await Trainer.create({
        id:id,
        name: name,
        age:age,
        email: email,
        mobile,
        fee:fee, 
      });
      res.send({ status: "ok", data: "User Created" });
    } catch (error) {
      res.send({ status: "error", data: error });
    }
  });

trainerRouter.post("/trainerdata", async (req, res) => {
    const { token } = req.body;
    console.log("I am Trainer Token from backend",token)
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const useremail = user.email; 
  
      Trainer.findOne({}).then((data) => {
        return res.send({ status: "Ok", data: data });
      });
    } catch (error) { 
      return res.send({ error: error }); 
    }
  });
  
  module.exports = trainerRouter;
  