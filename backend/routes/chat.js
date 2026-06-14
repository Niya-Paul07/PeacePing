const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

router.post("/", async (req, res) => {

  try {
    const { mood, message } = req.body;

  const prompt = `
You are Peace Mentor.

Current mood: ${mood}

If mood is Sad:
- Be comforting.

If mood is Anxious:
- Be calming.

If mood is Angry:
- Encourage healthy expression.

If mood is Lonely:
- Be warm and engaging.

User message:
${message}
`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to generate response"
    });
  }
});
module.exports = router;