import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SummaryCard from "../components/SummaryCard";
import TransactionCard from "../components/TransactionCard";
import ExpensePieChart from "../components/ExpensePieChart";
import api from "../services/api";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const res = await api.get("/dashboard");
                setDashboard(res.data.dashboard);
            } catch (err) {
                console.log(err.response?.data);
            }
        }
        loadDashboard();
    }, []);

    if (!dashboard) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-[70vh]">
                    <div className="text-xl font-semibold animate-pulse text-gray-500">
                        Loading Dashboard...
                    </div>
                </div>
            </Layout>
        );
    }

    const hour = new Date().getHours();
    let greeting = "Good Evening";
    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";

    return (
        <Layout>
            {/* Hero */}
            <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 md:p-8 shadow-xl">
                <h1 className="text-3xl md:text-4xl font-bold">
                    👋 {greeting}
                </h1>
                <p className="mt-2 md:mt-3 text-blue-100 text-base md:text-lg">
                    Welcome back! Here's your financial overview.
                </p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">
                <SummaryCard title="Today's Spent" value={dashboard.todaySpent} />
                <SummaryCard title="This Month" value={dashboard.monthSpent} />
                <SummaryCard title="Income" value={dashboard.monthIncome} />
                <SummaryCard title="Saved" value={dashboard.amountSaved} />
            </div>

            {/* Lower Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-10">
                
                {/* Transactions */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-5 md:p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                            Recent Transactions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {dashboard.recentTransactions?.length > 0 ? (
                            dashboard.recentTransactions.map(transaction => (
                                <TransactionCard
                                    key={transaction._id}
                                    transaction={transaction}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">
                                No Transactions Yet
                            </p>
                        )}
                    </div>
                </div>

                {/* Chart */}
                <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 border border-gray-100">
                    <h2 className="text-xl md:text-2xl font-bold mb-5 text-gray-800">
                        Expense Breakdown
                    </h2>
                    <ExpensePieChart data={dashboard.categoryExpenses} />
                </div>
            </div>

            {/* Bottom */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-10">
                
                {/* Budget */}
                <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 border border-gray-100">
                    <h2 className="text-xl md:text-2xl font-bold mb-5 text-gray-800">
                        Monthly Budget
                    </h2>

                    {dashboard.budget ? (
                        <>
                            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                        dashboard.budget.percentage >= 90
                                            ? "bg-red-500"
                                            : dashboard.budget.percentage >= 70
                                            ? "bg-yellow-500"
                                            : "bg-green-500"
                                    }`}
                                    style={{
                                        width: `${Math.min(dashboard.budget.percentage, 100)}%`
                                    }}
                                />
                            </div>

                            <div className="mt-6 space-y-3 text-sm md:text-base text-gray-600">
                                <div className="flex justify-between">
                                    <strong>Budget:</strong> 
                                    <span>₹{dashboard.budget.limit.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <strong>Spent:</strong> 
                                    <span>₹{dashboard.budget.used.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-800">
                                    <strong>Remaining:</strong> 
                                    <span className="font-bold">₹{dashboard.budget.remaining.toLocaleString()}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500">No Budget Set</p>
                    )}
                </div>

                {/* AI */}
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl shadow-lg p-5 md:p-6">
                    <h2 className="text-xl md:text-2xl font-bold">
                        🤖 AI Insight
                    </h2>
                    <p className="mt-4 md:mt-5 leading-relaxed text-purple-100 text-sm md:text-base">
                        {dashboard.monthSpent === 0
                            ? "Start adding expenses to receive personalized AI spending insights."
                            : "You're actively tracking your expenses. Continue logging transactions to unlock intelligent spending analysis and savings recommendations."
                        }
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;