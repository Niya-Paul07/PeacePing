import { useState } from "react";
import ChatPage from "./ChatPage";

const moodConfig = [
  { label: "Happy",    emoji: "😊", bg: "#FFF3B0", border: "#F6C90E", text: "#7A6000" },
  { label: "Sad",      emoji: "😢", bg: "#D6EAFF", border: "#5B9EF5", text: "#1A4E8A" },
  { label: "Anxious",  emoji: "😰", bg: "#FFE8CC", border: "#FF9A3C", text: "#7A3D00" },
  { label: "Stressed", emoji: "😤", bg: "#FFD6D6", border: "#F55B5B", text: "#7A1A1A" },
  { label: "Lonely",   emoji: "🥺", bg: "#E8D6FF", border: "#A855F7", text: "#4A1A7A" },
  { label: "Angry",    emoji: "😠", bg: "#FFD6E0", border: "#F55B8A", text: "#7A1A3A" },
];

function PeaceMentor({ onBack }) {
  const [mood, setMood] = useState("");
  const [startChat, setStartChat] = useState(false);

  // Chat page — back returns to mood selector
  if (startChat) {
    return <ChatPage mood={mood} onBack={() => setStartChat(false)} />;
  }

  // Mood selector page — back returns to home
  return (
    <div style={styles.page}>
      <button onClick={onBack} style={styles.backBtn}>← Back</button>

      <h2 style={styles.heading}>How are you feeling today?</h2>
      <p style={styles.sub}>Choose your mood to begin</p>

      <div style={styles.grid}>
        {moodConfig.map((m) => {
          const selected = mood === m.label;
          return (
            <button
              key={m.label}
              onClick={() => setMood(m.label)}
              style={{
                ...styles.moodBtn,
                background: m.bg,
                border: `2px solid ${selected ? m.border : "transparent"}`,
                boxShadow: selected
                  ? `0 0 0 3px ${m.border}44`
                  : "0 4px 12px rgba(0,0,0,0.07)",
                transform: selected ? "translateY(-4px)" : "none",
              }}
            >
              <span style={styles.emoji}>{m.emoji}</span>
              <span style={{ color: m.text, fontWeight: 600, fontSize: "15px" }}>
                {m.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        disabled={!mood}
        onClick={() => setStartChat(true)}
        style={{
          ...styles.startBtn,
          opacity: mood ? 1 : 0.45,
          cursor: mood ? "pointer" : "not-allowed",
        }}
      >
        Start Chat →
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #dfeeff, #f6fbff)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  backBtn: {
    position: "fixed",
    top: "8px",
    left: "16px",
    padding: "9px 18px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #7aa5f8, #4d7df0)",
    color: "white",
    border: "none",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    zIndex: 10,
  },
  heading: {
    fontSize: "32px",
    color: "#204b9b",
    marginBottom: "6px",
    fontFamily: "Poppins, sans-serif",
  },
  sub: {
    color: "#5c7bb0",
    fontSize: "16px",
    marginBottom: "36px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "36px",
  },
  moodBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    padding: "20px 28px",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    minWidth: "120px",
  },
  emoji: {
    fontSize: "36px",
  },
  startBtn: {
    padding: "14px 48px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #7aa5f8, #4d7df0)",
    color: "white",
    border: "none",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 6px 18px rgba(77,125,240,0.35)",
  },
};

export default PeaceMentor;