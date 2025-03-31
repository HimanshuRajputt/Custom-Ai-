import express from "express";
import "dotenv/config";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";


const app = express();
const port = process.env.PORT;
app.use(express.json())
app.use(cors())

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/res", async (req, res) => {
  const { prompt } = req.body;
  const result = await model.generateContent(prompt);
  res.send(result.response.text());
});

app.get("/",(req,res)=>{
  res.send("Healthy")
})


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
})
