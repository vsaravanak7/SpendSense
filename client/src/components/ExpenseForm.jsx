import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ExpenseForm({ isEdit, transactionId }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "Food",
        type: "expense",
        transactionDate: ""
    });

    const expenseCategories = [
        "Food", "Travel", "Shopping", "Bills", 
        "Medical", "Entertainment", "Education", "Other"
    ];
    
    const incomeCategories = [
        "Salary", "Investment", "Other"
    ];

    const categories = formData.type === "expense" ? expenseCategories : incomeCategories;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await api.put(`/transactions/${transactionId}`, formData);
                toast.success("Transaction Updated");
            } else {
                await api.post("/transactions", formData);
                toast.success("Transaction Added");
            }
            navigate("/dashboard");
            setFormData({
                title: "",
                amount: "",
                category: "Food",
                type: "expense",
                transactionDate: ""
            });
        } catch (err) {
            toast.error(err.response?.data?.message || "Error saving transaction");
        }
    };

    useEffect(() => {
        if (!isEdit) return;
        async function loadTransaction() {
            try {
                const res = await api.get(`/transactions/${transactionId}`);
                setFormData({
                    ...res.data.transaction,
                    transactionDate: res.data.transaction.transactionDate
                });
            } catch (err) {
                toast.error("Failed to load transaction");
            }
        }
        loadTransaction();
    }, [isEdit, transactionId]);

    return (
        <div className="max-w-2xl mx-auto pb-10">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 space-y-6 md:space-y-8"
            >
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                        {isEdit ? "✏️ Edit Transaction" : "💳 Add Transaction"}
                    </h1>
                    <p className="text-slate-500 mt-2 text-sm md:text-base">
                        {isEdit
                            ? "Update your transaction details below."
                            : "Track your income and expenses effortlessly."}
                    </p>
                </div>

                {/* iOS Style Segmented Toggle for Type */}
                <div className="bg-slate-100 p-1.5 rounded-2xl flex w-full">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: "expense", category: "Food" })}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            formData.type === "expense"
                                ? "bg-white text-red-600 shadow-sm border border-slate-200"
                                : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        💸 Expense
                    </button>

                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: "income", category: "Salary" })}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            formData.type === "income"
                                ? "bg-white text-green-600 shadow-sm border border-slate-200"
                                : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        💰 Income
                    </button>
                </div>

                <div className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1.5">
                            Title
                        </label>
                        <input
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                            placeholder={
                                formData.type === "expense"
                                    ? "e.g. Pizza, Fuel, Electricity Bill..."
                                    : "e.g. June Salary, Freelance Payment..."
                            }
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Amount & Category Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                    className="w-full pl-8 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                    type="number"
                                    placeholder="0.00"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1.5">
                                {formData.type === "income" ? "Income Source" : "Expense Category"}
                            </label>
                            <select
                                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors cursor-pointer appearance-none"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 ml-1 mb-1.5">
                            Transaction Date
                        </label>
                        <DatePicker
                            selected={formData.transactionDate ? new Date(formData.transactionDate) : null}
                            onChange={(date) => setFormData({ ...formData, transactionDate: date })}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select Date"
                            required
                            wrapperClassName="w-full"
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors cursor-pointer"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        className={`w-full rounded-xl py-4 text-white font-bold text-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer ${
                            isEdit
                                ? "bg-orange-500 hover:bg-orange-600 border border-orange-600"
                                : "bg-blue-600 hover:bg-blue-700 border border-blue-700"
                        }`}
                    >
                        {isEdit ? "Update Transaction" : "Save Transaction"}
                    </button>
                </div>

            </form>
        </div>
    );
}

export default ExpenseForm;