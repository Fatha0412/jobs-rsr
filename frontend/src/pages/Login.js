import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaBriefcase, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/shared.css";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://jobs-rsr-backend.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      import React, { useState } from 'react';

      const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = async (e) => {
          e.preventDefault();
          console.log('Form submitted, preventing reload...');
          try {
            const response = await fetch("https://jobs-rsr-backend.onrender.com/api/v1/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
              localStorage.setItem("token", data.token);
              alert("Login Success!");
              window.location.href = "/";
            } else {
              alert("Login Failed: " + data.message);
            }
          } catch (error) {
            console.error("Error:", error);
            alert("Network Error: Backend not reachable.");
          }
        };

        return (
          <form>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button 
              type="button" 
              onClick={handleSubmit}
              className="btn btn-primary btn-lg btn-block"
            >
              Login (Test Mode)
            </button>
          </form>
        );
      };

      export default Login;
                <button
