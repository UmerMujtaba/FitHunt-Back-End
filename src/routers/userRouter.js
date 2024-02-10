const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const mongoose = require("mongoose");
require('../schema/UserDetails')
const User = mongoose.model("UserInfo");


userRouter.get("/", (req, res) => {
  res.send({ status: "Started" });
});

userRouter.post("/register", async (req, res) => {
  const { id,name, email, mobile,gender,age, password } = req.body;
  console.log(req.body);

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.send({ data: "User already exists!!" });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
 
  try {
    await User.create({
      id:id,
      name: name,
      email: email,
      mobile,
      gender:gender,
      age:age,
      password: encryptedPassword,
    });
    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

userRouter.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email: email });

  if (!oldUser) {
    return res.send({ data: "User doesn't exists!!" });
  }

  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, process.env.JWT_SECRET);

    if (res.status(201)) {
      return res.send({ status: "ok", data: token });
    } else {
      return res.send({ error: "error" });
    }
  }
});

userRouter.post("/userdata", async (req, res) => {
  const { token } = req.body;
  console.log("Iam New",token)
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const useremail = user.email; 

    User.findOne({ email: useremail }).then((data) => {
      return res.send({ status: "Ok", data: data });
    });
  } catch (error) {
    return res.send({ error: error }); 
  }
});


userRouter.post("/update-user", async (req, res) => {
  const { id, name, email, age, mobile } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ status: "error", data: "User not found" });
    }

    // Update user data
    user.name = name;
    user.email = email;
    user.age = age;
    user.mobile = mobile;

    // Save the updated user data
    await user.save();
   
    res.send({ status: "ok", data: "User updated successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
});

module.exports = userRouter;
