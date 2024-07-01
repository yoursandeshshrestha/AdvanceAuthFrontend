import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "../../components/Headers";
import "../Home/home.css";

function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
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
          const data = await res.json();
          setUserEmail(data.ValidUser[0].email);
          setUserName(data.ValidUser[0].fullname);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);

  return (
    <div>
      <Headers />
      <div className="Home-Container">
        <div className="email">
          <h4>
            Sign in : <span> {userEmail}</span>
          </h4>
        </div>
        <div className="username">
          <h4>
            Full Name : <span>{userName}</span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Home;
