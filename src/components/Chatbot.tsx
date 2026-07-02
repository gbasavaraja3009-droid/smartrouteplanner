import { useState, useRef, useEffect } from "react";
import { askAI } from "../services/Chat";

type Props = {
  source?: string;
  destination?: string;
  distance?: string;
  time?: string;
  weather?: any;
  nearbyPlaces?: any[];
};

export default function Chatbot({
  source = "",
  destination = "",
  distance = "",
  time = "",
  weather = {},
  nearbyPlaces = [],
}: Props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<
  { sender: string; text: string }[]
>([
    {
      sender: "AI",
      text: "👋 Hello! I'm SmartRoute AI. Ask me anything about your trip.",
    },
  ]);

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "You",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
     const answer = await askAI(
  userMessage,
  source,
  destination,
  distance,
  time,
  weather,
  nearbyPlaces
);

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: answer,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "Unable to contact AI.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "none",
          background: "#2196f3",
          color: "white",
          fontSize: 24,
          cursor: "pointer",
          zIndex: 9999,
        }}
      >
        💬
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            right: 20,
            bottom: 90,
            width: 350,
            height: 500,
            background: "#111827",
            borderRadius: 15,
            color: "white",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: 15,
              fontWeight: "bold",
              fontSize: 20,
              borderBottom: "1px solid #333",
            }}
          >
            🤖 SmartRoute AI
          </div>

          <div
            ref={messagesRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 15,
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: 15,
                }}
              >
                <b>{msg.sender}</b>

                <div
                  style={{
                    marginTop: 5,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && <p>Thinking...</p>}
          </div>

          <div
            style={{
              padding: 10,
              borderTop: "1px solid #333",
            }}
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask about your trip..."
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "none",
                marginBottom: 10,
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "none",
                background: "#2196f3",
                color: "white",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}