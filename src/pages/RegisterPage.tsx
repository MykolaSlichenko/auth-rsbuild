import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

const RegisterPage = () => {
    const navigate = useNavigate();
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
            await api.post("/auth/register", {
                email,
                password,
            });

            setMessage("Registration successful");

            setEmail("");
            setPassword("");

            // Redirect to login page after 1.5 seconds
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error: any) {
            setMessage(
                error.response?.data?.message ||
                "Registration failed"
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
                    Register
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
                    Register
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

export default RegisterPage;