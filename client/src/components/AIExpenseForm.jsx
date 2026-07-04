import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaMagic, FaSpinner, FaSave } from "react-icons/fa";

function AIExpenseForm() {
    const navigate = useNavigate();

    const [prompt, setPrompt] = useState("");
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateTransaction = async () => {
        if (!prompt.trim()) {
            toast.error("Please enter an expense description");
            return;
        }

        try {
            setLoading(true);
            const res = await api.post("/ai/add-expense", { prompt });
            setPreview(res.data.transaction);
            toast.success("Transaction generated!");
        } catch (err) {
            toast.error(err.response?.data?.message || "AI Failed to understand");
        } finally {
            setLoading(false);
        }
    };

    const saveTransaction = async () => {
        try {
            await api.post("/transactions", preview);
            toast.success("Transaction Saved");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Save Failed");
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 pb-10">
            
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-2xl md:rounded-3xl shadow-lg text-white p-6 md:p-8 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl"></div>
                
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        ✨ AI Assistant
                    </h1>
                    <p className="mt-2 md:mt-3 text-indigo-100 text-sm md:text-lg max-w-xl">
                        Describe your expense naturally, and let our AI instantly categorize and convert it into a transaction.
                    </p>
                </div>
            </div>

            {/* Prompt Section */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-slate-800">
                    What did you spend on?
                </h2>

                <div className="relative">
                    <textarea
                        rows={5}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 text-slate-700 text-base md:text-lg resize-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-inner placeholder:text-slate-400"
                        placeholder="e.g., Bought 2 large pizzas and a coke for ₹850 yesterday evening after college."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={loading}
                    />
                </div>
                
                <p className="text-xs text-slate-500 mt-3 ml-1">
                    <span className="font-semibold text-indigo-600">Pro tip:</span> Include the amount, what you bought, and when.
                </p>

                <button
                    onClick={generateTransaction}
                    disabled={loading}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin text-xl" />
                            Analyzing Context...
                        </>
                    ) : (
                        <>
                            <FaMagic className="text-xl text-indigo-400" />
                            Generate Transaction
                        </>
                    )}
                </button>
            </div>

            {/* Preview Section */}
            {preview && (
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-md border border-indigo-100 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                            Review & Save
                        </h2>
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-100">
                            AI Generated
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1.5">
                                Title
                            </label>
                            <input
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                                value={preview.title}
                                onChange={(e) => setPreview({ ...preview, title: e.target.value })}
                            />
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1.5">
                                Amount
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-medium">
                                    ₹
                                </span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                                    value={preview.amount}
                                    onChange={(e) => setPreview({ ...preview, amount: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1.5">
                                Type
                            </label>
                            <select
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors cursor-pointer appearance-none"
                                value={preview.type}
                                onChange={(e) => setPreview({ ...preview, type: e.target.value })}
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1.5">
                                Category
                            </label>
                            <select
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors cursor-pointer appearance-none"
                                value={preview.category}
                                onChange={(e) => setPreview({ ...preview, category: e.target.value })}
                            >
                                <option>Food</option>
                                <option>Travel</option>
                                <option>Shopping</option>
                                <option>Bills</option>
                                <option>Medical</option>
                                <option>Entertainment</option>
                                <option>Education</option>
                                <option>Salary</option>
                                <option>Investment</option>
                                <option>Other</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1.5">
                                Transaction Date
                            </label>
                            <input
                                type="date"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors cursor-pointer"
                                value={preview.transactionDate?.substring(0, 10)}
                                onChange={(e) => setPreview({ ...preview, transactionDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        onClick={saveTransaction}
                        className="mt-8 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-sm hover:shadow transition-all cursor-pointer"
                    >
                        <FaSave className="text-xl" />
                        Save Transaction
                    </button>
                </div>
            )}
        </div>
    );
}

export default AIExpenseForm;