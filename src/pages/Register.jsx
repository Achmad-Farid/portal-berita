import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle, signup } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Tampilkan popup sukses jika pendaftaran berhasil
    if (user) {
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/login");
      }, 2000);
    }
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setPasswordError("");

    if (!email || !username || !password || !confirmPassword) {
      setFormError("Lengkapi semua field sebelum mendaftar.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    dispatch(signup({ email, username, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-dark">
      <div className="w-full max-w-md p-8 bg-white dark:bg-neutral-dark rounded-lg shadow-lg">
        <h1 className="text-3xl font-heading text-primary mb-6 text-center dark:text-gray-300">Register</h1>

        {loading && <div className="text-center text-primary font-heading text-lg mb-4 dark:text-gray-300">Loading...</div>}
        {error && <div className="text-center text-red-500 font-body text-sm mb-4">{error.message ? error.message : error}</div>}
        {formError && <div className="text-center text-red-500 font-body text-sm mb-4">{formError}</div>}
        {passwordError && <div className="text-center text-red-500 font-body text-sm mb-4">{passwordError}</div>}

        {showSuccessPopup && <div className="text-center text-green-500 font-heading text-lg mb-4 dark:text-gray-300">Pendaftaran berhasil! Mengalihkan ke halaman login...</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-body text-secondary mb-2 dark:text-gray-300" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-body border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-dark dark:text-gray-300 dark:border-gray-600"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-secondary mb-2 dark:text-gray-300" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md text-body border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-dark dark:text-gray-300 dark:border-gray-600"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-secondary mb-2 dark:text-gray-300" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-body border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-dark dark:text-gray-300 dark:border-gray-600"
                placeholder="Enter your password"
              />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-body text-secondary mb-2 dark:text-gray-300" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-body border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-dark dark:text-gray-300 dark:border-gray-600"
                placeholder="Confirm your password"
              />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded hover:bg-[#FF99E0] focus:outline-none focus:ring-2 focus:ring-accent shadow-md hover:shadow-lg dark:bg-primary dark:hover:bg-[#FF99E0]">
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent shadow-md hover:shadow-lg dark:bg-secondary dark:hover:bg-accent"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Register with Google"}
          </button>
        </div>

        <p className="text-center text-sm text-secondary mt-4 dark:text-gray-300">
          Already have an account?{" "}
          <a onClick={() => navigate("/login")} className="text-primary hover:underline cursor-pointer dark:text-primary">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
