const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require('./routers/userRouter')
const gymRouter = require('./routers/gymRouter')
const trainerRouter = require('./routers/trainerRouter')
const { cloudinaryConfig } = require('./config/cloudinaryConfig')
const cors = require('cors')
app.use(cors())
app.use('*', cloudinaryConfig);

require('dotenv').config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected")
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(userRouter);
app.use(gymRouter);
app.use(trainerRouter);
 
app.listen(5001, () => {
  console.log("Node js server started.");
});
  