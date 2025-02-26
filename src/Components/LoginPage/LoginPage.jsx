import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginPage.css"; // Import the CSS file

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only for registration
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuth = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Dummy authentication (Replace with actual API call)
      if (rollNo === "1234" && password === "password") {
        navigate("/student"); // Redirect to student dashboard
      } else if (rollNo === "faculty" && password === "password") {
        navigate("/faculty"); // Redirect to faculty dashboard
      } else {
        alert("Invalid Roll Number or Password");
      }
    } else {
      // Dummy registration logic (Replace with API call)
      alert("Registered Successfully! (Replace with actual API)");
      setIsLogin(true); // Switch to login after registration
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Toggle Buttons */}
        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <h2 className={`form-title ${isLogin ? "text-blue" : "text-green"}`}>
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleAuth}>
          {!isLogin && (
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Roll Number</label>
            <input
              type="text"
              placeholder="Enter Roll Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={`submit-btn ${isLogin ? "btn-blue" : "btn-green"}`}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;