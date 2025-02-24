import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        {/* Toggle Buttons */}
        <div className="d-flex justify-content-around mb-3">
          <button
            className={`btn ${isLogin ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`btn ${!isLogin ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <h2 className={`text-center ${isLogin ? "text-primary" : "text-success"}`}>
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleAuth}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Roll Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Roll Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={`btn w-100 ${isLogin ? "btn-primary" : "btn-success"}`}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
