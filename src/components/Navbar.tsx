import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") ||
      '{"name":"Guest"}'
  );

  return (
    <nav
      style={{
        background: "rgba(17,24,39,.9)",
        backdropFilter: "blur(15px)",
        color: "white",
        padding: "18px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "18px",
        marginBottom: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,.3)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "34px" }}>🚀</span>

        <div>
          <h2 style={{ margin: 0 }}>
            SmartRoute AI
          </h2>

          <small
            style={{
              color: "#94a3b8",
            }}
          >
            Intelligent Route Planner
          </small>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <button onClick={() => navigate("/home")}>🏠 Home</button>

        <button onClick={() => navigate("/dashboard")}>
          📊 Dashboard
        </button>

        <button onClick={() => navigate("/favorites")}>
          ⭐ Favorites
        </button>

        <button onClick={() => navigate("/profile")}>
          👤 Profile
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "24px" }}>🔔</span>

        <span style={{ fontSize: "24px" }}>🌙</span>

        <div
          style={{
            background: "#2563eb",
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          {user.name.charAt(0)}
        </div>
      </div>
    </nav>
  );
}
