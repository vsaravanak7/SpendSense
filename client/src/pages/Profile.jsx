import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data.user);
            setName(res.data.user.name);
        } catch {
            toast.error("Unable to load profile");
        }
    }

    async function saveProfile() {
        try {
            const res = await api.put("/auth/profile", { name });
            setUser(res.data.user);
            toast.success("Profile Updated");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error updating profile");
        }
    }

    async function changePassword() {
        if (!currentPassword || !newPassword) {
            return toast.error("Please fill in both password fields");
        }
        
        try {
            await api.put("/auth/change-password", {
                currentPassword,
                newPassword
            });
            toast.success("Password Updated");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error changing password");
        }
    }

    async function handleLogout() {
        if (!window.confirm("Are you sure you want to logout?")) return;
        
        try {
            await api.post("/auth/logout");
            toast.success("Logged Out");
            navigate("/");
        } catch {
            toast.error("Logout Failed");
        }
    }

    if (!user) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-[70vh]">
                    <div className="text-xl font-semibold animate-pulse text-slate-500">
                        Loading Profile...
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 pb-10">
                
                {/* Header / Hero */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl text-white shadow-xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
                        <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-full bg-white text-indigo-700 flex items-center justify-center text-3xl md:text-4xl font-bold shadow-inner">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-4xl font-bold">
                                {user.name}
                            </h1>
                            <p className="text-blue-100 text-sm md:text-lg mt-1 md:mt-2">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                    <h2 className="text-xl md:text-2xl font-bold mb-5 md:mb-6 text-slate-800">
                        Personal Information
                    </h2>

                    <div className="space-y-5">
                        {/* Editable Name Field */}
                        <div>
                            <label className="text-sm font-semibold text-slate-600 ml-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Read-Only Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-sm font-semibold text-slate-600 ml-1">
                                    Email Address
                                </label>
                                <div className="w-full mt-1.5 px-4 py-3 bg-slate-100 border border-transparent rounded-xl text-slate-600 cursor-not-allowed">
                                    {user.email}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-600 ml-1">
                                    Login Method
                                </label>
                                <div className="w-full mt-1.5 px-4 py-3 bg-slate-100 border border-transparent rounded-xl text-slate-600 cursor-not-allowed">
                                    {user.authProvider === "google" ? "Google Account" : "Email & Password"}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-slate-600 ml-1">
                                Member Since
                            </label>
                            <div className="w-full mt-1.5 px-4 py-3 bg-slate-100 border border-transparent rounded-xl text-slate-600 cursor-not-allowed">
                                {new Date(user.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                onClick={saveProfile}
                                className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                {/* Password Section (Only for local auth) */}
                {user.authProvider === "local" && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                        <h2 className="text-xl md:text-2xl font-bold mb-5 md:mb-6 text-slate-800">
                            Change Password
                        </h2>

                        <div className="space-y-4 max-w-md">
                            <div>
                                <input
                                    type="password"
                                    placeholder="Current Password"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={changePassword}
                                className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold shadow-sm hover:shadow transition-all cursor-pointer mt-2"
                            >
                                Update Password
                            </button>
                        </div>
                    </div>
                )}

                {/* Logout Section */}
                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleLogout}
                        className="w-full md:w-auto px-8 py-3 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 rounded-xl font-semibold transition-colors cursor-pointer"
                    >
                        Logout of Account
                    </button>
                </div>

            </div>
        </Layout>
    );
}

export default Profile;