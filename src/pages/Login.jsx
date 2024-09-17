import React from "react";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-light">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-heading text-secondary mb-6">Login</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-neutral-dark font-semibold">
              Email
            </label>
            <input type="email" id="email" placeholder="Enter your email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-accent" />
          </div>
          <div>
            <label htmlFor="password" className="block text-neutral-dark font-semibold">
              Password
            </label>
            <input type="password" id="password" placeholder="Enter your password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-accent" />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-accent">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
