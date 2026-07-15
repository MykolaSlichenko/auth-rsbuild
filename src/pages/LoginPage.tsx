import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

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
            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );
            console.log(response.data);

            const loginUser = response.data?.user ?? response.data;

            await login(
                response.data.accessToken,
                {
                    userId: loginUser?.userId,
                    email: loginUser?.email,
                },
                response.data.refreshToken
            );
            setIsError(false);
        } catch (error: any) {
            setMessage(
                error.response?.data?.message ||
                "Login failed"
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
                    Login
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
                    className="w-full rounded-lg cursor-pointer bg-blue-600 text-white font-bold text-lg p-3 border border-blue-700 hover:bg-blue-700 transition-colors"
                >
                    Send
                </button>

                {message && (
                    <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                        {message}
                    </p>
                )}

                <div className="pt-2">
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/register")
                            }
                            className="font-semibold text-blue-600 hover:text-blue-700 hover:cursor-pointer transition-colors"
                        >
                            Sign up here
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;