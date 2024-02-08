const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require('./routers/userRouter')
const gymRouter = require('./routers/gymRouter')

require('dotenv').config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(userRouter);
app.use(gymRouter);

app.listen(5001, () => {
  console.log("Node js server started.");
});
