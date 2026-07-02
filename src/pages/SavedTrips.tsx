import { useNavigate } from "react-router-dom";

function SavedTrips() {
  const navigate = useNavigate();

  const trips = JSON.parse(
    localStorage.getItem("savedTrips") || "[]"
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "40px",
      }}
    >
      <h1>💾 Saved Trips</h1>

      {trips.length === 0 && (
        <h3>No trips saved.</h3>
      )}

      {trips.map((trip: any, index: number) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          <h3>
            {trip.source} ➜ {trip.destination}
          </h3>

          <p>🚗 Mode: {trip.mode}</p>

          <p>📏 Distance: {trip.distance} km</p>

          <p>⏱ Time: {trip.time} min</p>

          <p>💰 ₹{trip.cost}</p>

          <p>📅 {trip.date}</p>
        </div>
      ))}

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: "30px",
          padding: "12px 25px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}

export default SavedTrips;