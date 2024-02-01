const express = require("express");
const admin = express();
const mongoose = require("mongoose");
admin.use(express.json());
const jwt = require("jsonwebtoken");

const mongoURL =
  "mongodb+srv://umermujtaba16:admin@cluster0.1dnnuhf.mongodb.net/?retryWrites=true&w=majority";

  const JWT_SECRET =
  "fadhfhfdjhfhcvfdgrehnhsadndsanawhweyyreyaffqqttutjtiutqafahjtuu5u5wdafwqfrwqgqwgtrh";
  mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

require("./GymDetails");

const Gym = mongoose.model("GymInfo");

admin.get("/",(req,res)=>{
    res.send({status:"started"})
});

admin.post("/gymregister", async (req, res) => {
    const {name,fee,mobile,location} = req.body;

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
        })
        res.send({status:"ok",data:"Data Created"})
    }
    catch (error) {
        res.send({status:"error",data: error})
    }
});

admin.post("/login-user",async(req,res) => {
  const {name,location}=req.body;
  const oldUser=await Gym.findOne({name:name});
  const oldUser2=await Gym.findOne({location:location});
  if(!oldUser && !oldUser2)
  {
    return res.send({data:"Gym dosen't exist!!"})
  }

  if(await res.compare(name,oldUser.name)) 
  {

    if(res.status(201))
    {
      return res.send({status: "ok"})
    }
    else{
      return res.send({error:"error"})
    }
  }
})

// admin.post("/userdata",async(req,res) =>{
//   const {token} = req.body;
//   try {
//     const user = jwt.verify(token,JWT_SECRECT)
//     const useremail=user.email

//     User.findOne({email:useremail}).then(data=>{
//       return res.send({status:"Ok",data: data})
//     })
//   }
//   catch (error){

//   }
// })

admin.post("/gymdata", async (req, res) => {
  const { token } = req.body;
  debugger
  try {
    // const Gym = jwt2.verify(token, JWT_SECRET);

    Gym.find().then((data) => {
      return res.send({ status: "Ok", data: JSON.stringify(data) });
    });

  } catch (error) {
    return res.send({ error: error });
  }
});

admin.listen(5003, () => {
  console.log("Node js server started.");
});
