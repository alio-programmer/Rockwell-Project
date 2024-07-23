const express = require("express");
const { querypostcontroller } = require("../Controller/Query.controller");

const Queryrouter = express.Router();

Queryrouter.post("/postquery", querypostcontroller);

module.exports = Queryrouter;
