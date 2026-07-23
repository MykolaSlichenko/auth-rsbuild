import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("Test");

    const [lastName, setLastName] = useState("Last Test");

    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const [email, setEmail] =
        useState("test@test.com");

    const [password, setPassword] =
        useState("Test123!");

    const [confirmPassword, setConfirmPassword] = useState("Test123!");

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

        try {
            await api.post("/auth/register", {
                firstName,
                lastName,
                email,
                password,
                acceptedTerms,
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
        <div className="flex min-h-screen items-center justify-center px-3 py-6 sm:px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-lg backdrop-blur sm:p-8"
            >
                <h1 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
                    Register
                </h1>

                <div className="mt-5 space-y-3 sm:space-y-4">
                    <input
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                        className={`w-full rounded-lg border p-3 text-base text-slate-700 outline-none transition ${isError
                            ? "border-red-500 bg-red-50"
                            : "border-slate-300 focus:border-blue-500"
                            }`}
                    />

                    <input
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                        className={`w-full rounded-lg border p-3 text-base text-slate-700 outline-none transition ${isError
                            ? "border-red-500 bg-red-50"
                            : "border-slate-300 focus:border-blue-500"
                            }`}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className={`w-full rounded-lg border p-3 text-base text-slate-700 outline-none transition ${isError
                            ? "border-red-500 bg-red-50"
                            : "border-slate-300 focus:border-blue-500"
                            }`}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className={`w-full rounded-lg border p-3 text-base text-slate-700 outline-none transition ${isError
                            ? "border-red-500 bg-red-50"
                            : "border-slate-300 focus:border-blue-500"
                            }`}
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        className={`w-full rounded-lg border p-3 text-base text-slate-700 outline-none transition ${isError
                            ? "border-red-500 bg-red-50"
                            : "border-slate-300 focus:border-blue-500"
                            }`}
                    />

                    <label className="flex items-start gap-2 text-sm text-slate-600">
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) =>
                                setAcceptedTerms(e.target.checked)
                            }
                            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>Accept Terms & Conditions</span>
                    </label>

                    <button
                        type="submit"
                        className="w-full rounded-lg border border-blue-700 bg-blue-600 p-3.5 text-lg font-bold text-white transition-colors hover:bg-blue-700"
                    >
                        Create account
                    </button>

                    {message && (
                        <p className={`rounded-lg p-3 text-sm ${isError
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-600"
                            }`}>
                            {message}
                        </p>
                    )}

                    <div className="pt-2">
                        <p className="text-center text-sm text-slate-600">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/login")
                                }
                                className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                            >
                                Log in here
                            </button>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;