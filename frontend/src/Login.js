import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.message !== "Login successful") {
        alert("Invalid login");
        return;
      }

      if (data.role === "admin") navigate("/admin");
      else navigate("/customer");

    } catch (error) {
      console.error(error);
      alert("Login error");
    }
  };

  return (
    <div>
      <div className="navbar">🍔 Smart Food Delivery</div>

      <div className="login-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button onClick={handleLogin}>Login</button>

        <p style={{ cursor: "pointer", color: "blue" }}
   onClick={() => navigate("/signup")}>
  Don't have an account? Signup
</p>
      </div>
    </div>
  );
}

export default Login;