

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaBriefcase, FaUser, FaEnvelope, FaLock, FaPhone, FaBuilding } from "react-icons/fa";
import "../styles/shared.css";
import "./Auth.css";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    phone: "",
    company: "",
    designation: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://jobs-rsr-backend.onrender.com/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration Success!");
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        alert("Registration Failed: " + (data.message || "Check your details"));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Network Error: Backend is blocking the browser or URL is wrong.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <FaBriefcase className="auth-logo" />
            <h1>Create Account</h1>
            <p>Join our job portal today</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>I am a</label>
              <div className="role-selector">
                <label className={`role-option ${formData.role === "student" ? "selected" : ""}`}>
                  <input type="radio" name="role" value="student" checked={formData.role === "student"} onChange={handleChange} />
                  <span>Student / Job Seeker</span>
                </label>
                <label className={`role-option ${formData.role === "hr" ? "selected" : ""}`}>
                  <input type="radio" name="role" value="hr" checked={formData.role === "hr"} onChange={handleChange} />
                  <span>HR / Recruiter</span>
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <div className="input-icon">
                  <FaUser className="icon" />
                  <input type="text" className="form-control" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-icon">
                  <FaPhone className="icon" />
                  <input type="tel" className="form-control" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <div className="input-icon">
                <FaEnvelope className="icon" />
                <input type="email" className="form-control" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            {formData.role === "hr" && (
              <div className="form-row">
                <div className="form-group">
                  <label>Company Name</label>
                  <div className="input-icon">
                    <FaBuilding className="icon" />
                    <input type="text" className="form-control" name="company" placeholder="Your company" value={formData.company} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <div className="input-icon">
                    <FaUser className="icon" />
                    <input type="text" className="form-control" name="designation" placeholder="Your role" value={formData.designation} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>Password *</label>
                <div className="input-icon">
                  <FaLock className="icon" />
                  <input type="password" className="form-control" name="password" placeholder="Min 6 characters" value={formData.password} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Confirm Password *</label>
                <div className="input-icon">
                  <FaLock className="icon" />
                  <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
