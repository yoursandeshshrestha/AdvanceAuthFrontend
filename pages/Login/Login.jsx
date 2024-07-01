import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Register/Register.css";
import { NavLink } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch(
            "https://advanceauthbackend.onrender.com/auth",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          );
          if (res.ok) {
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Error during authentication:", error);
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://advanceauthbackend.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.results.token);
        navigate("/dashboard");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  const showPasswordHandler = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="Register-Container">
      <div className="Register-Message">
        <h3>Login</h3>
        <p>Let's get started.</p>
      </div>
      <form onSubmit={handleLogin}>
        <div className="register-input-form">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Enter your email address"
          />
        </div>
        <div className="register-input-form">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            placeholder="Enter your password"
          />
          <button
            onClick={showPasswordHandler}
            className="password-show-button"
            type="button"
          >
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </button>
        </div>
        <button className="Register-submit-btn" type="submit">
          Login
        </button>
      </form>
      <div className="Other-Links">
        <p>
          Don't have an account?
          <span>
            <NavLink to="/register"> Create</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
