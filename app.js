const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs")
const jwt=require('jsonwebtoken');
const mongoURL =
  "mongodb+srv://umermujtaba16:admin@cluster0.1dnnuhf.mongodb.net/?retryWrites=true&w=majority";
  
  const JWT_SECRECT = "afafgjangj()gasgnj3kn5j2nn4o1[]anfjk5nkna"

  mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });
require("./UserDetails");
const User = mongoose.model("UserInfo");

app.get("/",(req,res)=>{
    res.send({status:"started"})
});

app.post("/register", async (req, res) => {
    const {username,mobile,email,password} = req.body;

    const oldUser = await User.findOne({email:email})

    if(oldUser){
        return res.send({data: "User already exists!!"})
    }
   

    try{
        await User.create({
            username: username,
            mobile: mobile,
            email: email,
            password: encryptedPassword
        })
        res.send({status:"ok",data:"User Created"})
    }
    catch (error) {
        res.send({status:"error",data: error})
    }
});

app.post("/login-user",async(req,res) => {
  const {email,password}=req.body;
  const oldUser=await User.findOne({email:email});

  if(!oldUser)
  {
    return res.send({data:"User dosen't exist!!"})
  }

  if(await bcrypt.compare(password,oldUser.password)) 
  {
    const token=jwt.sign({email:oldUser.email}, JWT_SECRECT);

    if(res.status(201))
    {
      return res.send({status: "ok", data: token})
    }
    else{
      return res.send({error:"error"})
    }
  }
})

app.post("/userdata",async(req,res) =>{
  const {token} = req.body;
  try {
    const user = jwt.verify(token,JWT_SECRECT)
    const useremail=user.email

    User.findOne({email:useremail}).then(data=>{
      return res.send({status:"Ok",data: data})
    })
  }
  catch (error){

  }
})

app.listen(5001, () => {
  console.log("Node js server started.");
});
