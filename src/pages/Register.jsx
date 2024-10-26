import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/actions/authActions";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error messages
    setFormError("");
    setPasswordError("");

    // Check if any field is empty
    if (!email || !username || !password || !confirmPassword) {
      setFormError("Lengkapi semua field sebelum mendaftar.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    dispatch(signup({ email, username, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-heading text-primary mb-6 text-center">Register</h1>

        {/* Tampilan Loading */}
        {loading && <div className="text-center text-primary font-heading text-lg mb-4">Loading...</div>}

        {/* Tampilan Error dari Server */}
        {error && <div className="text-center text-red-500 font-body text-sm mb-4">{error.message ? error.message : error}</div>}

        {/* Tampilan Error untuk form kosong */}
        {formError && <div className="text-center text-red-500 font-body text-sm mb-4">{formError}</div>}

        {/* Tampilan Error untuk password mismatch */}
        {passwordError && <div className="text-center text-red-500 font-body text-sm mb-4">{passwordError}</div>}

        {/* Form Register */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-body text-secondary mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-body text-primary border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-secondary mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-body text-primary border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-secondary mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-body text-primary border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-secondary mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-body text-primary border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-primary text-white rounded-md font-body text-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-secondary mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
