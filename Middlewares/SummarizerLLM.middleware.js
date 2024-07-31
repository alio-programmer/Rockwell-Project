const { GoogleGenerativeAI } = require("@google/generative-ai");
const { pretify } = require("../Common/pretify");

const SummarygenAImodel = async (prompt) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You will be given a large prompt with large number of queries concanated together you have to study those queries and give a summary of the queries point wise in a json format like {summary} where summary is only one field and contains the negatives from the query in a single paragraph if multiple similar queries exist try to compile them into one point of the report only",
  });
  const result = await model.generateContent([prompt]);
  resp = result.response.text();
  return pretify(resp);
};

module.exports = SummarygenAImodel;
