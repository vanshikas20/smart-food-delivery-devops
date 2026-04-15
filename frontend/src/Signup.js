import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const navigate = useNavigate();

  const signup = async () => {
  const res = await fetch("http://localhost:8080/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, role }),
  });

  const data = await res.json();
  alert(data.message);

  // ✅ Redirect based on role
  if (role === "admin") {
    navigate("/admin");
  } else {
    navigate("/customer");
  }
};
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Signup</h1>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />

      <input type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />
      <br />

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>

      <br /><br />

      <button onClick={signup}>Signup</button>
    </div>
  );
}

export default Signup;