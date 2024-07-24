const genAImodel = require("../Middlewares/LLM.middleware");
const Query = require("../Model/Query.model");

const querypostcontroller = async (req, res) => {
  try {
    console.log(req.body);
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }
    const response = await genAImodel(query);
    const {
      department,
      reply,
      solution_for_backend,
      querySentiment,
      priority,
    } = response;
    const newQuery = await Query.create({
      department,
      query,
      queryResponse: reply,
      querySolution: solution_for_backend,
      priority,
      querySentiment,
    });
    if (newQuery) {
      return res
        .status(200)
        .json({ newQuery, message: "Query posted successfully" });
    }
    return res.status(500).json({
      message: "Query not recorded due to server error please try again",
    });
  } catch (error) {
    return res.json({ message: error.message }).status(500);
  }
};

module.exports = { querypostcontroller };
