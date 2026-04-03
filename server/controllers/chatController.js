import ChatLog from "../models/ChatLog.js";
import fetch from "node-fetch"; 
export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    let reply;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000); // 25s timeout

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a medical assistant. Provide clear, concise guidance about medicines, including:
- What the medicine is used for
- When and how it should be taken (morning, evening, before/after food if applicable)
- Dosage frequency if known
Always remind the user to consult a doctor for personalized advice.`
            },
            { role: "user", content: message }
          ],
          max_tokens: 700,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = await response.json();

      if (data.error) {
        console.error("OpenAI API error:", data.error);
        reply = "Sorry, medicine guidance is currently unavailable.";
      } else {
        reply = data.choices?.[0]?.message?.content || "No response from AI.";
      }

    } catch (err) {
      console.error("OpenAI fetch failed:", err);
      reply = "Sorry, I cannot access medicine guidance right now. Please consult a doctor.";
    }

    if (ChatLog) {
      try {
        await ChatLog.create({ userMessage: message, aiResponse: reply });
      } catch (dbErr) {
        console.error("DB save error:", dbErr);
      }
    }

    res.json({ reply });

  } catch (err) {
    console.error("Chat controller error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
