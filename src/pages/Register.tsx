import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        email,
      })
    );

    localStorage.setItem("loggedIn", "true");

    alert("Registration Successful");

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)"
      }}
    >
      <div
        style={{
          width: "430px",
          background: "white",
          padding: "35px",
          borderRadius: "18px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.3)"
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Create Account
        </h1>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={{
            width:"100%",
            padding:"12px",
            marginTop:"20px"
          }}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            width:"100%",
            padding:"12px",
            marginTop:"15px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{
            width:"100%",
            padding:"12px",
            marginTop:"15px"
          }}
        />

        <button
          onClick={handleRegister}
          style={{
            width:"100%",
            marginTop:"20px",
            padding:"12px",
            background:"#2563eb",
            color:"white",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer"
          }}
        >
          Register
        </button>

        <button
          onClick={()=>navigate("/login")}
          style={{
            width:"100%",
            marginTop:"12px",
            padding:"12px",
            background:"#f3f4f6",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer"
          }}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export default Register;