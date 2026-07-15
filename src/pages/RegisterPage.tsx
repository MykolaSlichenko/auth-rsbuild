import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");

    const [lastName, setLastName] = useState("");

    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] =
        useState("");

    const [isError, setIsError] =
        useState(false);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!acceptedTerms) {
            setMessage("Please accept the Terms & Conditions");
            setIsError(true);
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            setIsError(true);
            return;
        }
        e.preventDefault();

        try {
            await api.post("/auth/register", {
                firstName,
                lastName,
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
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) =>
                        setFirstName(e.target.value)
                    }
                    className={`w-full border p-3 rounded-lg ${isError
                        ? "border-red-500 bg-red-50"
                        : ""
                        }`}
                />

                <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) =>
                        setLastName(e.target.value)
                    }
                    className={`w-full border p-3 rounded-lg ${isError
                        ? "border-red-500 bg-red-50"
                        : ""
                        }`}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className={`w-full border p-3 rounded-lg ${isError
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
                    className={`w-full border p-3 rounded-lg ${isError
                        ? "border-red-500 bg-red-50"
                        : ""
                        }`}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    className={`w-full border p-3 rounded-lg ${isError
                        ? "border-red-500 bg-red-50"
                        : ""
                        }`}
                />

                <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) =>
                            setAcceptedTerms(e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Accept Terms & Conditions
                </label>

                <button
                    type="submit"
                    className="w-full rounded-lg cursor-pointer bg-blue-600 text-white font-bold text-lg p-4 border border-blue-700 hover:bg-blue-700 transition-colors"
                >
                    Create account
                </button>

                {message && (
                    <p className={`text-sm p-3 rounded-lg ${isError
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