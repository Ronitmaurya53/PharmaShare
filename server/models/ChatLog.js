import mongoose from "mongoose";

const ChatLogSchema = new mongoose.Schema({
  userMessage: String,
  aiResponse: String,
  createdAt: { type: Date, default: Date.now },
});

const ChatLog = mongoose.model("ChatLog", ChatLogSchema);
export default ChatLog;
