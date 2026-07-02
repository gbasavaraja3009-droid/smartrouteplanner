import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") ||
      JSON.stringify({
        name: "Demo User",
        email: "demo@smartroute.com",
      })
  );

  const savedTrips = JSON.parse(
    localStorage.getItem("savedTrips") || "[]"
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "white",
          borderRadius: "18px",
          padding: "35px",
          textAlign: "center",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            fontSize: "80px",
          }}
        >
          👤
        </div>

        <h2>{user.name}</h2>

        <p>{user.email}</p>

        <hr />

        <div
          style={{
            textAlign: "left",
            marginTop: "25px",
            lineHeight: "2",
          }}
        >
          <p><b>Joined:</b> July 2026</p>

          <p><b>Total Trips:</b> {savedTrips.length}</p>

          <p><b>Saved Trips:</b> {savedTrips.length}</p>

          <p><b>Account:</b> Active ✅</p>
        </div>

        <button
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Edit Profile
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "12px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;