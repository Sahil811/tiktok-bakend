import mongoose from "mongoose";

const tiktokSchema = new mongoose.Schema({
  url: String,
  channel: String,
  song: String,
  likes: String,
  messages: String,
  description: String,
  shares: String,
});

// Collection inside the database
const Videos = mongoose.model("tiktokVideos", tiktokSchema);
export default Videos;
