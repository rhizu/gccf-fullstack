"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/auth";
import { FaUser, FaLock, FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import "./loginPage.css";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      const success = loginAdmin(username, password);

      if (success) {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
        setLoading(false);
      }
    }, 800);
  }

  return (
    <div className="admin-login-container">
      {/* Animated background elements */}
      <div className="background-overlay">
        <div className="bg-element bg-element-1"></div>
        <div className="bg-element bg-element-2"></div>
      </div>

      {/* Login Card */}
      <div className="login-wrapper">
        {/* Logo/Header Section */}
        <div className="login-header">
          <div className="logo-badge">
            <FaShieldAlt className="logo-icon" />
          </div>
          <h1 className="login-title">GCCF Admin</h1>
          <p className="login-subtitle">Secure Administrator Access</p>
        </div>

        {/* Login Form Card */}
        <div className="login-card">
          <form onSubmit={handleLogin} className="login-form">
            {/* Username Input */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <FaUser />
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <svg
                  className="error-icon"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`login-button ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <>
                  <svg
                    className="spinner"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="spinner-circle"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="spinner-path"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <FaShieldAlt />
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Additional Links */}
            <div className="form-footer">
              <button type="button" className="forgot-password">
                Forgot password?
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p>© 2024 Global Cybersecurity Community Forum</p>
          <p>Secure Admin Portal v2.0</p>
        </div>
      </div>
    </div>
  );
}
