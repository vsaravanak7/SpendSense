import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
    FaEdit,
    FaTrash,
    FaArrowUp,
    FaArrowDown
} from "react-icons/fa";

function HistoryRow({ transaction, loadTransactions }) {
    const navigate = useNavigate();

    const deleteTransaction = async () => {
        // Prevent accidental deletions on mobile
        if (!window.confirm("Are you sure you want to delete this transaction?")) return;
        
        try {
            await api.delete(`/transactions/${transaction._id}`);
            toast.success("Transaction Deleted");
            loadTransactions();
        } catch {
            toast.error("Delete Failed");
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Left Section: Icon & Details */}
            <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                <div
                    className={`shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center ${
                        transaction.type === "expense"
                            ? "bg-red-50"
                            : "bg-green-50"
                    }`}
                >
                    {transaction.type === "expense" ? (
                        <FaArrowDown className="text-red-500 text-sm md:text-base" />
                    ) : (
                        <FaArrowUp className="text-green-500 text-sm md:text-base" />
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-base md:text-lg text-slate-800 truncate">
                        {transaction.title}
                    </h2>
                    
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md shrink-0">
                            {transaction.category}
                        </span>
                        <span className="text-xs text-slate-400 truncate">
                            • {new Date(transaction.transactionDate).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Section: Amount & Actions (Wraps to next line on mobile) */}
            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 mt-1 sm:mt-0 border-slate-100">
                <h2
                    className={`font-bold text-lg md:text-xl whitespace-nowrap ${
                        transaction.type === "expense"
                            ? "text-slate-800"
                            : "text-green-600"
                    }`}
                >
                    {transaction.type === "expense" ? "-" : "+"}
                    <span className="text-sm md:text-base ml-0.5">₹</span>
                    {Number(transaction.amount).toLocaleString()}
                </h2>

                <div className="flex items-center gap-1 md:gap-2">
                    <button
                        onClick={() => navigate(`/edit/${transaction._id}`)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none"
                        title="Edit"
                    >
                        <FaEdit size={18} />
                    </button>

                    <button
                        onClick={deleteTransaction}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none"
                        title="Delete"
                    >
                        <FaTrash size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HistoryRow;