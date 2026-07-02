import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") ||
      '{"name":"Guest","email":"guest@gmail.com"}'
  );

  const savedTrips = JSON.parse(
    localStorage.getItem("savedTrips") || "[]"
  );

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef4ff",
        padding: "35px",
        fontFamily: "Arial,sans-serif",
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#1e3a8a,#0f172a)",
          borderRadius: "22px",
          padding: "35px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 15px 35px rgba(0,0,0,.25)",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "38px",
            }}
          >
            👋 Welcome, {user.name}
          </h1>

          <p
            style={{
              marginTop: "15px",
              fontSize: "18px",
              opacity: .95,
            }}
          >
            AI Powered Intelligent Route Planning
          </p>

          <p>{user.email}</p>
        </div>

        <div
          style={{
            fontSize: "90px",
          }}
        >
          🚀
        </div>
      </div>
      {/* ================= HERO ================= */}

<div
  onClick={() => navigate("/planner")}
  style={{
    width: "90%",
    maxWidth: "1100px",
    margin: "40px auto",
    background: "linear-gradient(135deg,#2563eb,#1e40af)",
    color: "white",
    borderRadius: "24px",
    padding: "35px 45px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 20px 40px rgba(37,99,235,.35)",
  }}
>
  {/* Left Side */}

  <div
    style={{
      flex: 1,
      maxWidth: "700px",
    }}
  >
    <h1
      style={{
        margin: 0,
        fontSize: "38px",
        fontWeight: "bold",
      }}
    >
      🚀 Open Route Planner
    </h1>

    <p
      style={{
        marginTop: "20px",
        fontSize: "20px",
        lineHeight: "1.8",
        opacity: 0.95,
      }}
    >
      Plan intelligent journeys using AI recommendation,
      weather prediction, live traffic, fuel estimation,
      cost comparison, nearby places, government booking,
      RedBus, IRCTC and flight booking.
    </p>

    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate("/planner");
      }}
      style={{
        marginTop: "30px",
        padding: "16px 38px",
        background: "#22c55e",
        color: "white",
        border: "none",
        borderRadius: "12px",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(34,197,94,.35)",
      }}
    >
      🚀 Start Planning
    </button>
  </div>

  {/* Right Side */}

  <div
    style={{
      fontSize: "120px",
      marginLeft: "40px",
    }}
  >
    🗺️
  </div>
</div>

      {/* ================= STATS ================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",
          gap: "25px",
          marginTop: "35px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "white",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          <h3>🚗 Total Trips</h3>

          <h1
            style={{
              fontSize: "42px",
            }}
          >
            {savedTrips.length}
          </h1>

          <p>Trips Planned</p>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#ec4899,#db2777)",
            color: "white",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          <h3>❤️ Saved Trips</h3>

          <h1
            style={{
              fontSize: "42px",
            }}
          >
            {savedTrips.length}
          </h1>

          <p>Favourite Routes</p>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#10b981,#059669)",
            color: "white",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          <h3>🤖 AI Suggestions</h3>

          <h1
            style={{
              fontSize: "42px",
            }}
          >
            32
          </h1>

          <p>Generated</p>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#f59e0b,#d97706)",
            color: "white",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          <h3>🔍 Searches</h3>

          <h1
            style={{
              fontSize: "42px",
            }}
          >
            15
          </h1>

          <p>Today</p>
        </div>
      </div>

      {/* ================= HERO ================= */}

      
     

      <div
  style={{
    marginTop: "35px",
    background: "white",
    borderRadius: "20px",
    padding: "35px",
    boxShadow: "0 10px 25px rgba(0,0,0,.08)"
  }}
>

<h2 style={{marginBottom:"25px"}}>
🕒 Recent Trips
</h2>

{savedTrips.length===0 ? (

<div
style={{
textAlign:"center",
padding:"40px"
}}
>

<h2>No Trips Yet</h2>

<p>
Start planning your first intelligent journey.
</p>

<button
onClick={()=>navigate("/planner")}
style={{
marginTop:"20px",
padding:"15px 35px",
background:"#2563eb",
color:"white",
border:"none",
borderRadius:"12px",
cursor:"pointer",
fontSize:"18px"
}}
>
🚀 Plan Trip
</button>

</div>

):(savedTrips.map((trip:any,index:number)=>(

<div
key={index}
style={{
padding:"20px",
borderRadius:"15px",
marginBottom:"15px",
background:"#f8fafc"
}}
>

<h3>{trip.from} → {trip.to}</h3>

<p>
Distance : {trip.distance}
</p>

<p>
Time : {trip.time}
</p>

<p>
Cost : ₹{trip.cost}
</p>

</div>

)))}

</div>

      {/* ================= AI ASSISTANT ================= */}

      <div
        style={{
          marginTop: "35px",
          background:
            "linear-gradient(135deg,#0f172a,#1e3a8a)",
          color: "white",
          borderRadius: "22px",
          padding: "35px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2>🤖 AI Travel Assistant</h2>

          <p>
            Personalized travel insights based on your
            searches.
          </p>

          <ul
            style={{
              lineHeight: "34px",
              marginTop: "20px",
            }}
          >
            <li>🚆 Train saves up to 35% cost.</li>

            <li>🚗 Morning travel avoids heavy traffic.</li>

            <li>🌤 Weather conditions are favourable.</li>

            <li>⛽ Carpooling reduces fuel expenses.</li>
          </ul>

          <button
            style={{
              marginTop: "15px",
              padding: "12px 24px",
              background: "#22c55e",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            View Smart Suggestions
          </button>
        </div>

        <div
          style={{
            fontSize: "110px",
          }}
        >
          🤖
        </div>
      </div>
      
      {/* ================= TECHNOLOGIES ================= */}

      <div
        style={{
          marginTop: "40px",
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          ⚡ Powered By
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
            gap: "18px",
          }}
        >
          {[
            "🤖 AI Recommendation",
            "🗺 Google Maps",
            "🚦 TomTom Traffic",
            "🌦 OpenWeather",
            "🚆 IRCTC",
            "🚌 Government Bus",
            "🔴 RedBus",
            "✈ Flight Booking",
          ].map((item) => (
            <div
              key={item}
              style={{
                background: "#f8fafc",
                padding: "18px",
                borderRadius: "14px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <footer
        style={{
          marginTop: "50px",
          background: "#0f172a",
          color: "white",
          borderRadius: "20px",
          padding: "35px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginTop: 0,
          }}
        >
          🚀 Smart Route Planner
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
          }}
        >
          Intelligent Multi-Modal Travel Decision Support System
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            flexWrap: "wrap",
            marginTop: "25px",
            color: "#e2e8f0",
          }}
        >
          <span>Privacy Policy</span>
          <span>Terms</span>
          <span>Contact</span>
          <span>About</span>
          <span>Support</span>
        </div>

        <hr
          style={{
            margin: "30px 0",
            borderColor: "#334155",
          }}
        />

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: 0,
          }}
        >
          Version 1.0 • © 2026 Smart Route Planner • Powered by AI
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;