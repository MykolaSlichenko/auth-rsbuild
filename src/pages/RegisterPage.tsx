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

    const [isError, setIsError] =
        useState(false);

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
            setIsError(false);

            setEmail("");
            setPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error: any) {
            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );
            setIsError(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-4 border p-6 rounded-xl"
            >
                <h1 className="text-3xl font-bold text-center">
                    Register
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className={`w-full border p-3 rounded-lg ${
                        isError
                            ? "border-red-500 bg-red-50"
                            : ""
                    }`}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className={`w-full border p-3 rounded-lg ${
                        isError
                            ? "border-red-500 bg-red-50"
                            : ""
                    }`}
                />

                <button
                    type="submit"
                    className="w-full border p-3 rounded-lg cursor-pointer"
                >
                    Register
                </button>

                {message && (
                    <p className={`text-sm p-3 rounded-lg ${
                        isError
                            ? "text-red-600 bg-red-50"
                            : "text-green-600 bg-green-50"
                    }`}>
                        {message}
                    </p>
                )}

                <div className="pt-2">
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/login")
                            }
                            className="font-semibold text-blue-600 hover:text-blue-700 hover:cursor-pointer transition-colors"
                        >
                            Log in here
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;