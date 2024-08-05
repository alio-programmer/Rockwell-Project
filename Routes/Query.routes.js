const express = require("express");
const {
  querypostcontroller,
  queryupdatecontroller,
} = require("../Controller/Query.controller");

const Queryrouter = express.Router();

Queryrouter.post("/postquery", querypostcontroller);
Queryrouter.put("/updatequery/:id", queryupdatecontroller);

module.exports = Queryrouter;
