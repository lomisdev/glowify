import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountAuth.css";

export default function AccountAuth() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // Sign up process
      localStorage.setItem("user", JSON.stringify(formData));
      setMessage("✅ Account created successfully! You can now sign in.");
      setIsSignup(false);
      setFormData({ name: "", email: "", password: "" });
    } else {
      // Login process
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        localStorage.setItem("loggedIn", "true");
        setMessage(`👋 Welcome back, ${storedUser.name}!`);
        setTimeout(() => navigate("/products"), 1000);
      } else {
        setMessage("❌ Invalid email or password.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">{isSignup ? "Create Account" : "Sign In"}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <div className="auth-switch">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="auth-toggle"
          >
            {isSignup
              ? "Already have an account? Sign In"
              : "Don’t have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
