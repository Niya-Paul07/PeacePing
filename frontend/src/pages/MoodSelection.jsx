import { useState } from "react";

function MoodSelection() {
  const [mood, setMood] = useState("");

  const moods = ["Happy", "Sad", "Anxious", "Stressed", "Lonely", "Angry"];

  return (
    <div>
      <h2>Select Your Mood</h2>

      {moods.map((m) => (
        <button key={m} onClick={() => setMood(m)}>
          {m}
        </button>
      ))}

      <p>Selected: {mood}</p>
    </div>
  );
}

export default MoodSelection;