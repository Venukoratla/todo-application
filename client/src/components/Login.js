import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

const LoginForm = () => {
  const [mobile_no, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = {
      mobile_no,
      password,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content-type to JSON
        },
        body: JSON.stringify(loginDetails),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token);
        sessionStorage.setItem("token", data.token);
        navigate("/");
        setMobileNo("");
        setPassword("");
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div className="login form">
        <header>Login</header>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your mobile_no"
            value={mobile_no}
            onChange={(e) => setMobileNo(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" type="submit">
            {" "}
            submit
          </button>
        </form>
        <div className="signup">
          <span>
            Don't have an account?
            <label htmlFor="check" onClick={() => navigate("/register")}>
              Signup
            </label>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
