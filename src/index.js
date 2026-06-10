const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ScamShield AU Server is running!" });
});

app.post("/analyse", async (req, res) => {
  const { text, contentType } = req.body;
  try {
    const r = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [{
          role: "user",
          content: "Analyse this " + contentType + " for scams. Respond ONLY in JSON with these keys: riskPercentage (number 0-100), classification (exactly Likely Scam or Unlikely Scam), scamType (string), simpleExplanation (string in plain English for elderly Australians), detailedExplanation (string), immediateActions (array of 3-4 strings), preventionTips (array of 3 strings). Message: " + text
        }]
      },
      {
        headers: {
          "x-api-key": process.env.ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        }
      }
    );
    const t = r.data.content[0].text;
    const json = t.substring(t.indexOf("{"), t.lastIndexOf("}") + 1);
    res.json(JSON.parse(json));
  } catch (e) {
    console.error(e.response?.data || e.message);
    res.status(500).json({ error: "Analysis failed" });
  }
});

const PORT = process.env.PORT || 3001;

setInterval(() => {
  const https = require("https");
  https.get("https://scamshield-server.onrender.com/");
  console.log("Keep alive ping sent");
}, 14 * 60 * 1000);

app.listen(PORT, () => console.log("Server running on port " + PORT));