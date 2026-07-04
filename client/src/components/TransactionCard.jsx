import {
    FaUtensils,
    FaCar,
    FaShoppingBag,
    FaMoneyBillWave,
    FaFilm,
    FaHospital,
    FaGraduationCap,
    FaWallet
} from "react-icons/fa";

function TransactionCard({ transaction }) {

    const icons = {
        Food: <FaUtensils className="text-red-500" />,
        Travel: <FaCar className="text-blue-500" />,
        Shopping: <FaShoppingBag className="text-pink-500" />,
        Bills: <FaMoneyBillWave className="text-yellow-500" />,
        Medical: <FaHospital className="text-green-500" />,
        Entertainment: <FaFilm className="text-purple-500" />,
        Education: <FaGraduationCap className="text-indigo-500" />,
        Salary: <FaMoneyBillWave className="text-green-600" />,
        Investment: <FaWallet className="text-emerald-500" />,
        Other: <FaWallet className="text-slate-500" />
    };

    return (
        <div
            className="
            bg-white
            rounded-xl
            shadow-sm border border-slate-100
            hover:shadow-md hover:border-slate-200
            transition-all
            duration-200
            p-4 md:p-5
            mb-3 md:mb-4
            group"
        >
            <div className="flex justify-between items-center gap-4">
                
                {/* Left Side: Icon & Details */}
                <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                    <div className="bg-slate-50 border border-slate-100 p-2 md:p-3 rounded-full text-lg md:text-xl shrink-0 transition-transform group-hover:scale-110">
                        {icons[transaction.category] || icons.Other}
                    </div>

                    <div className="flex flex-col overflow-hidden">
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

                {/* Right Side: Amount */}
                <div
                    className={`text-lg md:text-xl font-bold whitespace-nowrap shrink-0 ${
                        transaction.type === "income"
                            ? "text-green-600"
                            : "text-slate-800"
                    }`}
                >
                    {transaction.type === "income" ? "+" : "-"}
                    <span className="text-sm md:text-base ml-0.5">₹</span>
                    {Number(transaction.amount).toLocaleString()}
                </div>

            </div>
        </div>
    );
}

export default TransactionCard;