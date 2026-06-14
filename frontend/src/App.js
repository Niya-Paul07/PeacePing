import { useState } from "react";
import "./App.css";
import PeaceMentor from "./pages/PeaceMentor";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
function App() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [page, setPage] = useState("login");
  const [history, setHistory] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const generateName = () => {
  const names = [
    "PeaceSoul",
    "CalmRiver",
    "BlueSky",
    "SilentStar",
    "HopeWing",
    "MoonGlow",
    "GentleMind",
    "DreamCloud",
    "KindHeart",
    "SoftBreeze"
  ];

  const random =
    names[Math.floor(Math.random() * names.length)] +
    Math.floor(Math.random() * 1000);

  setUsername(random);
};

  const submitMood = async (mood) => {
    try {
      const response = await fetch("https://peaceping.onrender.com/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "550e8400-e29b-41d4-a716-446655440000",
          mood: mood,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Mood "${mood}" saved successfully!`);
      } else {
        setMessage(data.message || "Error saving mood");
      }
    } catch (error) {
      setMessage("Server connection error");
    }
  };

  const getReport = async () => {
    try {
      const res = await fetch(
      "https://peaceping.onrender.com/api/mood-history/550e8400-e29b-41d4-a716-446655440000"
      );
      const data = await res.json();
      const graphData = data.map((item) => ({
      date: item.created_at
        ? new Date(item.created_at).toLocaleDateString()
        : "Unknown",
      score:
        item.mood === "Happy"
          ? 3
          : item.mood === "Neutral"
          ? 2
          : 1,
    }));

    setAnalytics(graphData);
    setPage("analytics");
      
    } catch (error) {
      alert("Could not fetch report. Is the server running?");
    }
  };

  const getHistory = async () => {
  try {
    const res = await fetch(
      "https://peaceping.onrender.com/api/mood-history/550e8400-e29b-41d4-a716-446655440000"
    );

    const data = await res.json();

    setHistory(data);
  } catch (error) {
    alert("Could not load history");
  }
};

  if (page === "login") {
  return (
    <div className="login-page">

      <div className="login-card">

        <div className="dove">🕊️</div>

        <h1 className="login-title">
          Peace Ping
        </h1>

        <p className="welcome">
          A safe space for your emotions
        </p>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter name or generate one"
          className="name-input"
/>

<button
  className="generate-btn"
  onClick={generateName}
>
  🎲 Generate Anonymous Name
</button>
<button className="start-btn" onClick={() => {
    if (!username.trim()) {
      alert("Enter or generate a name");
      return;
    }
    setPage("home");
  }}>
  Start Your Journey →
</button>


      </div>

    </div>
  );
}
if (page === "history") {
  return (
    <div className="history-page">

      <button className="back-btn" onClick={() => setPage("home")}>← Back</button>
     

      <h1>Mood History</h1>

      {history.map((item) => (
  <div key={item.id} className="history-card">
    <span>{item.mood}</span>

    <span>
      {item.created_at
        ? new Date(item.created_at).toLocaleDateString()
        : "No Date"}
    </span>
  </div>
))}

    </div>
  );
}

if (page === "analytics") {
return ( <div className="analytics-page">

  <button
    className="back-btn"
    onClick={() => setPage("home")}>
    ← Back
  </button>

  <div className="analytics-container">

    <h1 className="analytics-title">
      Mood Analytics
    </h1>

    <div className="analytics-content">

      <div className="graph-container">
        <LineChart
          width={900}
          height={400}
          data={analytics}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
           <YAxis domain={[1, 3]}
  ticks={[1, 2, 3]}
  interval={0}
  allowDecimals={false}
  tickFormatter={(value) => {
    if (value === 3) return "Happy";
    if (value === 2) return "Neutral";
    if (value === 1) return "Sad";
    return value;
  }}/>

        <Tooltip />

        <Line
          type="monotone"
          dataKey="score"
          stroke="#5b8def"
          strokeWidth={5}
          dot={{r: 5}}
        />
        </LineChart>
      </div>

      <div className="analytics-legend">
        <h3>Mood Score Guide</h3>

        <div>😊 3 = Happy</div>
        <div>😐 2 = Neutral</div>
        <div>😟 1 = Sad</div>
      </div>

    </div>

  </div>

</div>

);
}

if (page === "peacementor") {
    return <PeaceMentor onBack={() => setPage("home")} />;
}

  return (
  <div className="app">
    {/* Sidebar */}
    <div className="sidebar">
      <div className="logo-section">
        <div className="logo-icon">🕊️</div>
        <h2>Peace Ping</h2>
        <p>Mood Tracker</p>
      </div>
      
      <button className="side-btn" onClick={() => setPage("peacementor")}>
  🌿 Peace Mentor
</button>

      <button className="side-btn" onClick={getReport}>📊 Weekly Analytics</button>
      <button className="side-btn" onClick={async () => { await getHistory(); setPage("history");}}>📅 Mood History</button>
      <button className="side-btn">💡 Insights</button>
      <button className="side-btn"onClick={() => setPage("login")}>🔙 Back To Login</button>

    </div>

    {/* Main Content */}
    <div className="main-content">
      <h1 className="title">Peace Ping</h1>
      <p className="welcome-user">
      Welcome, {username} 🌸
      </p>

      <p className="subtitle">
        Track your emotions. Nurture your peace.
      </p>

      <div className="mood-container">

        <div
          className="mood-card happy"
          onClick={() => submitMood("Happy")}
        >
          <div className="emoji">😊</div>
          <h2>Happy</h2>
          <p>I'm feeling good</p>
        </div>

        <div
          className="mood-card neutral"
          onClick={() => submitMood("Neutral")}
        >
          <div className="emoji">😐</div>
          <h2>Neutral</h2>
          <p>I'm okay</p>
        </div>

        <div
          className="mood-card sad"
          onClick={() => submitMood("Sad")}
        >
          <div className="emoji">😢</div>
          <h2>Sad</h2>
          <p>Not feeling great</p>
        </div>
        <div>
      {/* other content */}
    </div>

      </div>

      {message && (
        <div className="success-box">
          {message}
        </div>
      )}
      

    </div>
  </div>
);  
}

export default App;