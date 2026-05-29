import { useState } from "react";

import api from "../api/axios";

const LoginPage = () => {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "accessToken",
        response.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        response.data.refreshToken
      );

      setMessage("Login successful");
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 border p-6 rounded-xl"
      >
        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full border p-3 rounded-lg"
        >
          Login
        </button>

        {message && (
          <p className="text-sm">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;