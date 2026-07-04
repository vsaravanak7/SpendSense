import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWallet, FaSpinner } from "react-icons/fa";
import api from "../services/api";
import toast from "react-hot-toast";

function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await api.post("/auth/signup", formData);
            toast.success(res.data.message || "Signup Successful");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup Failed");
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
                        Create Account
                    </h1>
                    <p className="text-slate-500 mt-2 text-sm text-center">
                        Start managing your finances and tracking expenses today.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1.5">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                            onChange={handleChange}
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
                            name="password"
                            placeholder="Create a strong password"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3.5 font-bold shadow-sm hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : "Create Account"}
                        </button>
                    </div>
                </form>

                {/* Footer Link */}
                <p className="text-center mt-8 text-slate-500 text-sm">
                    Already have an account?
                    <Link to="/" className="text-indigo-600 font-bold ml-1.5 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;