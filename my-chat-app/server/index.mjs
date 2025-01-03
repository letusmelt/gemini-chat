import { GoogleGenerativeAI } from '@google/generative-ai';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch from 'node-fetch';

// 确保在使用环境变量之前加载 .env 文件
dotenv.config();

// 检查 API key 是否存在
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY not found in environment variables');
  process.exit(1);
}

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const proxy = process.env.HTTPS_PROXY || "http://127.0.0.1:7890";
const agent = new HttpsProxyAgent(proxy);

global.fetch = (url, options = {}) => {
  return fetch(url, {
    ...options,
    agent: agent
  });
};

// 打印 API key 的前几个字符（用于调试）
console.log('API Key prefix:', process.env.GEMINI_API_KEY.substring(0, 5) + '...');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/chat", async (req, res) => {
  try {
    console.log("Received message:", req.body.message);
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required and must be a string." });
    }

    console.log("Before generateContent");
    const result = await model.generateContent(message);
    console.log("Gemini API result:", result);
    const response = result.response;
    console.log("Gemini API response:", response);
    const text = response.text();
    console.log("Gemini API text:", text);

    res.json({ reply: text });
  } catch (error) {
    console.error("Error generating content:", error);
    console.error("Error details:", error.message, error.stack);
    res.status(500).json({ error: "Failed to generate response", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});