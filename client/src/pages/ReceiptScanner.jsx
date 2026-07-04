import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaFileInvoice, FaSpinner, FaSave, FaCheckCircle } from "react-icons/fa";

function ReceiptScanner() {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    async function handleUpload() {
        if (!file) {
            toast.error("Please select a receipt.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("receipt", file);

            const res = await api.post("/ai/receipt", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setPreview(res.data.transaction);
            toast.success("Receipt Processed Successfully");

        } catch (err) {
            toast.error(err.response?.data?.message || "Upload Failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function saveTransaction() {
        try {
            await api.post("/transactions", preview);
            toast.success("Transaction Saved");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Save Failed");
        }
    }

    return (
        <Layout>
            <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 pb-10">

                {/* Hero Section */}
                <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-2xl md:rounded-3xl shadow-lg text-white p-6 md:p-8 relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl"></div>
                    
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            📷 Receipt Scanner
                        </h1>
                        <p className="mt-2 md:mt-3 text-purple-100 text-sm md:text-lg max-w-xl">
                            Upload a receipt image and let AI instantly extract the total amount, category, and date.
                        </p>
                    </div>
                </div>

                {/* Upload Card */}
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-5 text-slate-800">
                        Upload Receipt
                    </h2>

                    {/* Custom File Upload Dropzone */}
                    <div className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all duration-200 ${
                        file ? "border-green-400 bg-green-50" : "border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-400"
                    }`}>
                        {/* Hidden File Input covering the entire box */}
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={(e) => {
                                if (e.target.files[0]) {
                                    setFile(e.target.files[0]);
                                    setPreview(null); // Reset preview if a new file is chosen
                                }
                            }}
                        />
                        
                        <div className="flex flex-col items-center justify-center space-y-3">
                            {file ? (
                                <>
                                    <FaCheckCircle className="text-5xl text-green-500 mb-2" />
                                    <p className="text-green-700 font-semibold text-lg">
                                        Receipt Selected
                                    </p>
                                    <p className="text-green-600/80 text-sm truncate max-w-xs">
                                        {file.name}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <FaCloudUploadAlt className="text-6xl text-indigo-400 mb-2" />
                                    <p className="text-slate-700 font-semibold text-lg">
                                        Tap to browse or drop an image
                                    </p>
                                    <p className="text-slate-500 text-sm">
                                        Supports JPG, PNG, and HEIC
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleUpload}
                        disabled={loading || !file}
                        className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin text-xl" />
                                Scanning Receipt...
                            </>
                        ) : (
                            <>
                                <FaFileInvoice className="text-xl text-indigo-400" />
                                Extract Details
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
                                AI Extracted
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
                                    Total Amount
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
                                    value={preview.type || "expense"}
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
                                    value={preview.category || "Food"}
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
                                    value={preview.transactionDate?.substring(0, 10) || ""}
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
        </Layout>
    );
}

export default ReceiptScanner;