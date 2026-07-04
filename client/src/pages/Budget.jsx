import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";

function Budget() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const [budgetLimit, setBudgetLimit] = useState("");
    const [warningPercentage, setWarningPercentage] = useState(80);

    const [budget, setBudget] = useState(null);
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        fetchBudget();
        fetchDashboard();
    }, []);

    async function fetchBudget() {
        try {
            const res = await api.get(`/budget?month=${month}&year=${year}`);
            if (res.data.budget) {
                setBudget(res.data.budget);
                setBudgetLimit(res.data.budget.budgetLimit);
                setWarningPercentage(res.data.budget.warningPercentage);
            }
        } catch (err) {
            console.error("Error fetching budget data", err);
        }
    }

    async function fetchDashboard() {
        try {
            const res = await api.get("/dashboard");
            setDashboard(res.data.dashboard);
        } catch (err) {
            console.error("Error fetching dashboard status", err);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!budgetLimit || Number(budgetLimit) <= 0) {
            toast.error("Please enter a valid budget amount");
            return;
        }

        try {
            const res = await api.post("/budget", {
                month,
                year,
                budgetLimit,
                warningPercentage
            });

            setBudget(res.data.budget);
            await fetchDashboard();
            toast.success("Budget Configuration Saved");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error saving layout configurations");
        }
    }

    return (
        <Layout>
            <div className="space-y-6 md:space-y-8 pb-10">
                {/* Title Header Area */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                        Monthly Budget
                    </h1>
                    <p className="text-slate-500 mt-1 md:mt-2 text-sm md:text-base">
                        Set your monthly spending ceilings and stay on track with smart thresholds.
                    </p>
                </div>

                {/* Split Column Panel Framework Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

                    {/* Budget Controls Input Forms Card */}
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold mb-5 md:mb-6 text-slate-800 flex items-center gap-2">
                                <span>⚙️</span> Budget Settings
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1.5">
                                        Monthly Allocation Limit
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-medium">
                                            ₹
                                        </span>
                                        <input
                                            type="number"
                                            placeholder="Enter complete amount limit"
                                            className="w-full pl-8 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                            value={budgetLimit}
                                            onChange={(e) => setBudgetLimit(e.target.value)}
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center ml-1 mb-1.5">
                                        <label className="text-sm font-semibold text-slate-600">
                                            Warning Alert Trigger Threshold
                                        </label>
                                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                            {warningPercentage}%
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="50"
                                        max="100"
                                        value={warningPercentage}
                                        onChange={(e) => setWarningPercentage(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                                    />
                                    <span className="flex justify-between text-2xs text-slate-400 px-1 mt-1 font-medium">
                                        <span>50%</span>
                                        <span>75%</span>
                                        <span>100%</span>
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold transition-all shadow-sm hover:shadow cursor-pointer"
                                >
                                    Save Configurations
                                </button>
                            </form>
                        </div>

                        {budget && (
                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider mb-3">
                                    Saved Metadata Parameters
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div>
                                        <p className="text-slate-500 font-medium">Limit Goal:</p>
                                        <p className="text-base font-bold text-slate-800 mt-0.5">₹{Number(budget.budgetLimit).toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 font-medium">Alert Level:</p>
                                        <p className="text-base font-bold text-slate-800 mt-0.5">{budget.warningPercentage}%</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Live Tracking Progress Monitoring Metrics Card */}
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                        <h2 className="text-xl md:text-2xl font-bold mb-5 md:mb-6 text-slate-800 flex items-center gap-2">
                            <span>📊</span> Budget Status
                        </h2>

                        {dashboard?.budget ? (
                            <div className="space-y-6">
                                {/* Grid metric box blocks */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-blue-50/60 border border-blue-100/50 rounded-2xl p-4 md:p-5">
                                        <p className="text-slate-500 font-medium text-xs md:text-sm uppercase tracking-wider">
                                            Total Budget
                                        </p>
                                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-1">
                                            ₹{Number(dashboard.budget.limit).toLocaleString('en-IN')}
                                        </h2>
                                    </div>

                                    <div className="bg-red-50/60 border border-red-100/50 rounded-2xl p-4 md:p-5">
                                        <p className="text-slate-500 font-medium text-xs md:text-sm uppercase tracking-wider">
                                            Current Expenses
                                        </p>
                                        <h2 className="text-2xl md:text-3xl font-bold text-red-600 mt-1">
                                            ₹{Number(dashboard.budget.used).toLocaleString('en-IN')}
                                        </h2>
                                    </div>
                                </div>

                                <div className="bg-emerald-50/60 border border-emerald-100/50 rounded-2xl p-5">
                                    <p className="text-slate-500 font-medium text-xs md:text-sm uppercase tracking-wider">
                                        Remaining Allowance
                                    </p>
                                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-600 mt-1 tracking-tight">
                                        ₹{Number(dashboard.budget.remaining).toLocaleString('en-IN')}
                                    </h2>
                                </div>

                                {/* Progress bar metrics interface display panel tracking logic */}
                                <div className="pt-2">
                                    <div className="flex justify-between items-center mb-2 text-sm">
                                        <span className="font-semibold text-slate-700">Budget Usage Consumption</span>
                                        <span className="font-bold text-slate-800">{dashboard.budget.percentage.toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ease-out ${
                                                dashboard.budget.percentage >= 90
                                                    ? "bg-red-500"
                                                    : dashboard.budget.percentage >= 70
                                                    ? "bg-amber-500"
                                                    : "bg-emerald-500"
                                            }`}
                                            style={{
                                                width: `${Math.min(dashboard.budget.percentage, 100)}%`
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Trigger Danger Warning Banner Alert System Block */}
                                {dashboard.budget.warning && (
                                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 animate-pulse">
                                        <span className="text-xl mt-0.5">⚠️</span>
                                        <div>
                                            <h3 className="font-bold text-red-700 text-sm md:text-base">
                                                Over-Threshold Warning
                                            </h3>
                                            <p className="text-red-600 text-xs md:text-sm mt-0.5 leading-relaxed">
                                                You are approaching or have completely exceeded your designated allocation parameters for this billing cycle.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-slate-400 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center">
                                <span className="text-4xl mb-2">💸</span>
                                <p className="text-sm font-medium">No active budget allocations created yet.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </Layout>
    );
}

export default Budget;