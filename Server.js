const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

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
          content: "Analyse this " + contentType + " for scams. Respond ONLY in JSON with these keys: riskPercentage (number), classification (Likely Scam or Unlikely Scam), scamType, simpleExplanation, detailedExplanation, immediateActions (array), preventionTips (array). Message: " + text
        }]
      },
      {
        headers: {
          "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        }
      }
    );
    const t = r.data.content[0].text;
    res.json(JSON.parse(t.substring(t.indexOf("{"), t.lastIndexOf("}") + 1)));
  } catch (e) {
    console.error(e.response?.data || e.message);
    res.status(500).json({ error: "failed" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));