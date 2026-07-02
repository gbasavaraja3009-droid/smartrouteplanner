import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleLogin = () => {
    if (login(email, password)) {
      if (remember) {
        localStorage.setItem("rememberUser", "true");
      }

      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  const demoLogin = () => {
    login("demo@smartroute.com", "demo123");
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
          boxShadow: "0 15px 35px rgba(0,0,0,0.35)"
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          🚀 Smart Route Planner
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666"
          }}
        >
          Welcome Back
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "12px",
            fontSize: "14px"
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />{" "}
            Remember Me
          </label>

          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{
              border: "none",
              background: "transparent",
              color: "#2563eb",
              cursor: "pointer"
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            marginTop: "22px",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Login
        </button>

        <button
          onClick={demoLogin}
          style={{
            width: "100%",
            marginTop: "12px",
            padding: "12px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🚀 Login as Demo
        </button>

        <button
          style={{
            marginTop: "15px",
            background: "transparent",
            border: "none",
            color: "#2563eb",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Forgot Password?
        </button>

        <button
          onClick={() => navigate("/register")}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "12px",
            background: "#f3f4f6",
            border: "1px solid #ddd",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Create New Account
        </button>

        <div
          style={{
            marginTop: "25px",
            background: "#eff6ff",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #bfdbfe"
          }}
        >
          <h3 style={{ margin: 0 }}>
            🎯 Demo Account
          </h3>

          <p style={{ marginTop: "10px" }}>
            <b>Email:</b> demo@smartroute.com
          </p>

          <p>
            <b>Password:</b> demo123
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

