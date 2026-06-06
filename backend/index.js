console.log("THIS IS MY INDEX FILE");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Test routes
app.get("/", (req, res) => {
  res.send("Peace Ping Backend Running");
});

app.get("/test", (req, res) => {
  res.send("Test route works");
});

app.get("/hello", (req, res) => {
  res.send("Hello");
});

// Save mood
app.post("/api/mood", async (req, res) => {
  const { user_id, mood } = req.body;

  const { data, error } = await supabase
    .from("moods")
    .insert([{ user_id, mood }]);

  if (error) return res.status(500).json(error);

  res.json({ success: true, data });
});

// Weekly report  ← THIS was broken, now fixed
app.get("/api/weekly-report/:userId", async (req, res) => {
  const userId = req.params.userId;

  const { data, error } = await supabase
    .from("moods")
    .select("*")
    .eq("user_id", userId);

  if (error) return res.status(500).json(error);

  const moodScore = { Happy: 3, Neutral: 2, Sad: 1 };

  let total = 0;
  data.forEach((entry) => {
    total += moodScore[entry.mood] || 0;
  });

  const average = data.length > 0 ? total / data.length : 0;

  let message = "";
  if (average > 2.5)
    message = "You're doing well this week!";
  else if (average >= 2)
    message = "A mixed week. Keep taking care of yourself.";
  else
    message = "You seem to be struggling. Consider talking to someone you trust.";

  res.json({ entries: data.length, average, message });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});