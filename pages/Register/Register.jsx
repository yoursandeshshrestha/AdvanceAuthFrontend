import React, { useState } from "react";
import "./Register.css";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { LuEye, LuEyeOff } from "react-icons/lu";

function Register() {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!fname || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    fetch("https://advanceauthbackend.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fname,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Email already in use") {
          toast.error(data.message);
        } else {
          toast.success("Registration successful!");
          setFname("");
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      });
  };

  const showpasswordHandler = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="Register-Container">
      <div className="Register-Message">
        <h3>Register</h3>
        <p>Let's get started.</p>
      </div>
      <form onSubmit={handleRegister}>
        <div className="register-input-form">
          <label htmlFor="fname">Full Name</label>
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            name="fname"
            id="name"
            placeholder="Enter a name"
          />
        </div>
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
            onClick={showpasswordHandler}
            className="password-show-button"
          >
            {showPassword ? <LuEye /> : <LuEyeOff />}
          </button>
        </div>
        <button className="Register-submit-btn" type="submit">
          Sign Up
        </button>
      </form>
      <div className="Other-Links">
        <p>
          Already have an account?{" "}
          <span>
            <NavLink to="/">Login</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
