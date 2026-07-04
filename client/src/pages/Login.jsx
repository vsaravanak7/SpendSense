import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaWallet, FaSpinner } from "react-icons/fa";
import api from "../services/api";
import toast from "react-hot-toast";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await api.post("/auth/login", { email, password });
            toast.success("Login Successful");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 sm:p-10">
                
                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-full shadow-sm mb-4">
                        <FaWallet size={32} className="text-indigo-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                        ExpenseAI
                    </h1>
                    <p className="text-slate-500 mt-2 text-sm">
                        Welcome Back 👋 Please enter your details.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3.5 font-bold shadow-sm hover:shadow transition-all mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <FaSpinner className="animate-spin" /> : "Sign In"}
                    </button>

                    {/* Divider */}
                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">Or</span>
                        <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}
                        className="w-full flex justify-center items-center gap-3 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 rounded-xl py-3.5 font-semibold text-slate-700 transition-colors"
                    >
                        <FaGoogle className="text-red-500 text-lg" />
                        Continue with Google
                    </button>
                </form>

                {/* Footer Link */}
                <p className="text-center mt-8 text-slate-500 text-sm">
                    Don't have an account?
                    <Link to="/signup" className="text-indigo-600 font-bold ml-1.5 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;