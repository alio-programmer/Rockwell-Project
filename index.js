const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/DB");
dotenv.config();
const app = express();

app.use(express.json());

const startserver = async () => {
  await connectDB();

  try {
    app.listen(5000, () => {
      console.log("server listening on http://localhost:5000");
    });
  } catch (error) {
    console.log(error.message);
  }
};

startserver();
