import { useState } from "react";

function ChatPage({ mood,onBack}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const userMsg = { sender: "user", text: message };
      setMessages((prev) => [...prev, userMsg]);
      setMessage("");

      const res = await fetch("https://peaceping.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, message }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (error) {
      console.error(error);
      alert("Fetch failed");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    
    <div style={styles.wrapper}>      
    <button onClick={onBack} style={styles.backBtn}>← Back</button>

      <div style={styles.header}>🌿 Peace Mentor</div>

      <div style={styles.messages}>
        {messages.map((msg, i) =>
          msg.sender === "user" ? (
            <div key={i} style={styles.rowUser}>
              <div style={styles.bubbleUser}>{msg.text}</div>
            </div>
          ) : (
            <div key={i} style={styles.rowAi}>
              <div style={styles.avatar}>🌿</div>
              <div style={styles.bubbleAi}>{msg.text}</div>
            </div>
          )
        )}
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Share what's on your mind..."
        />
        <button style={styles.btn} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "#f0f4f8",
  },
  header: {
    padding: "14px 18px",
    paddingLeft: "120px",
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "16px",
    fontWeight: "500",
    textAlign: "center",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  rowUser: {
    display: "flex",
    justifyContent: "flex-end",
  },
  rowAi: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gap: "8px",
  },
  bubbleUser: {
    background: "#378ADD",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "18px 18px 4px 18px",
    maxWidth: "70%",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  bubbleAi: {
    background: "#fff",
    color: "#1a1a1a",
    padding: "10px 14px",
    borderRadius: "18px 18px 18px 4px",
    maxWidth: "75%",
    fontSize: "14px",
    lineHeight: "1.5",
    border: "1px solid #e5e7eb",
  },
  avatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#e1f5ee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    flexShrink: 0,
  },
  inputRow: {
    display: "flex",
    gap: "8px",
    padding: "12px 14px",
    background: "#fff",
    borderTop: "1px solid #e5e7eb",
  },
  input: {
    flex: 1,
    padding: "9px 14px",
    borderRadius: "20px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    background: "#f9fafb",
  },
  btn: {
    padding: "9px 18px",
    borderRadius: "20px",
    background: "#378ADD",
    color: "#fff",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
  },
  backBtn:{
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
  zIndex: 20,

  }
};

export default ChatPage;