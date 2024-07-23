const { GoogleGenerativeAI } = require("@google/generative-ai");
const { pretify } = require("../Common/pretify");

const genAImodel = async (prompt) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are given a prompt of customer response. You have to decide which department to notify among Technical, HR, and Customer Service. Give the name of department, reply to customer and suggest solution for backend employees to make their work easy in a json format. The json field format should be in this format : {department, reply, solution_for_backend}",
  });
  const result = await model.generateContent([prompt]);
  resp = result.response.text();
  return pretify(resp);
};

module.exports = genAImodel;
