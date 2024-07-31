const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./DB");
const Queryrouter = require("../Routes/Query.routes");
const Summaryrouter = require("../Routes/Summarizer.routes");

//configurations
dotenv.config();
const app = express();

//middlewares
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

//routes
app.use("/api", Queryrouter);
app.use("/", Summaryrouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = startserver;
