import React, { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([
    { sender: "Zelo", text: "How can i help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("https://zelo-ai.onrender.com/chat", {
        message: input,
      });

      setMessages([
        ...newMessages,
        { sender: "Zelo", text: res.data.reply || "No response." },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: "Zelo", text: "Error connecting to the AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={styles.container}>
      <h2>Zelo ~ AI personal Bot</h2>
      <div className="chat-box" style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#5ec576" : "#444654",
            }}
          >
            <strong>{msg.sender === "user" ? "You" : "Zelo"}:</strong>{" "}
            {msg.text}
          </div>
        ))}
        {loading && <div style={styles.typing}>Zelo is typing...</div>}
      </div>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const customScrollbar = `
  .chat-box::-webkit-scrollbar {
    width: 6px;
  }

  .chat-box::-webkit-scrollbar-track {
    background: transparent;
  }

  .chat-box::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 10px;
  }

  .chat-box::-webkit-scrollbar-thumb:hover {
    background-color: #777;
  }
`;
const styleTag = document.createElement("style");
styleTag.innerHTML = customScrollbar;
document.head.appendChild(styleTag);

const styles = {
  container: {
    color:"white",
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    height: "400px",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "10px",
    backgroundColor: "black",
  },
  message: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%",
  },
  typing: {
    fontStyle: "italic",
    color: "white",
    alignSelf: "flex-start",
  },
  inputArea: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#2b90d9",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
