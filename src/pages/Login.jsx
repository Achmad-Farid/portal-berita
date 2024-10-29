import React from "react";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-light">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-heading text-primary mb-6 text-center">Login</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-body text-secondary mb-2">
              Email
            </label>
            <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-md text-body text-primary border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your password" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-body text-secondary mb-2">
              Password
            </label>
            <input type="password" id="password" name="password" className="w-full px-4 py-2 border rounded-md text-body text-primary border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your password" />
          </div>
          <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded hover:bg-[#FF99E0] focus:outline-none focus:ring-2 focus:ring-[#FF99E0] shadow-md hover:shadow-lg">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <button className="w-full bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent shadow-md hover:shadow-lg">Login with Google</button>
        </div>
        <p className="text-center text-sm text-secondary mt-4">
          Doesnt have an account?{" "}
          <a href="/register" className="text-primary hover:underline">
            register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
