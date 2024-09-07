import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    mobile_no: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}register-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set content-type to JSON
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({
          mobile_no: "",
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
        });
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="registration form">
        <header>Signup</header>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="text"
            name="mobile_no"
            placeholder="Enter your mobile number"
            value={formData.mobile_no}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button className="button" type="submit">
            Sign up
          </button>
        </form>
        <div className="signup">
          <span>
            Already have an account?
            <label htmlFor="check" onClick={() => navigate("/login")}>
              Login
            </label>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
