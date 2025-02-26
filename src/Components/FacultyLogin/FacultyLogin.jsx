import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyLogin.css"; // Import the CSS file

const LoginForm = ({ role, onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only for registration
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLogin) {
      onAuth(rollNo, password, role, navigate);
    } else {
      alert("Registered Successfully! (Replace with actual API)");
      setIsLogin(true);
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
          {isLogin ? `Login` : `Register`}
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
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
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

export default LoginForm;
