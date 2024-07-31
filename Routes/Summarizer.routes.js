const express = require("express");
const { Summarizer } = require("../Controller/Summarizer.controller");
const Summaryrouter = express.Router();

Summaryrouter.post("/summarize", Summarizer);

module.exports = Summaryrouter;
