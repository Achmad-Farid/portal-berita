import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Reset success message on new attempt
    try {
      const result = await dispatch(login({ identifier, password }));
      if (!result.error) {
        // Check if login was successful
        setSuccessMessage("Login successful!");
        setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-light dark:bg-neutral-dark">
      <div className="w-full max-w-md p-8 bg-white dark:bg-neutral-dark shadow-lg rounded-lg">
        <h1 className="text-3xl font-heading text-primary mb-6 text-center dark:text-text-dark">Login</h1>
        {successMessage && <p className="text-center text-green-500 mb-4">{successMessage}</p>}
        {error && <p className="text-center text-red-500 mb-4">{error.message}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="text" className="block text-sm font-body text-secondary mb-2 dark:text-text-dark">
              Email or Username
            </label>
            <input
              type="text"
              id="text"
              name="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-body border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-dark dark:text-gray-300 dark:border-gray-600"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-body border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-dark dark:text-gray-300 dark:border-gray-600"
              placeholder="Enter your password"
            />
            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-text-light" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded hover:bg-[#FF99E0] focus:outline-none focus:ring-2 focus:ring-[#FF99E0] shadow-md hover:shadow-lg dark:hover:bg-primary">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          <button onClick={handleGoogleLogin} className="w-full bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent shadow-md hover:shadow-lg dark:hover:bg-secondary">
            {loading ? "Logging in..." : "Login with Google"}
          </button>
        </div>
        <p className="text-center text-sm text-secondary mt-4 dark:text-text-light">
          Doesn’t have an account?{" "}
          <a onClick={() => navigate("/register")} className="text-primary hover:underline cursor-pointer">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
