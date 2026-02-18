
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "student",
    company: "",
    designation: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://jobs-rsr-backend.onrender.com/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Registration failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: "100%" }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} style={{ width: "100%" }}>
            <option value="student">Student</option>
            <option value="hr">HR</option>
          </select>
        </div>
        {formData.role === "hr" && (
          <>
            <div style={{ marginBottom: 12 }}>
              <label>Company:</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} style={{ width: "100%" }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Designation:</label>
              <input type="text" name="designation" value={formData.designation} onChange={handleChange} style={{ width: "100%" }} />
            </div>
          </>
        )}
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10 }}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
