import {
    FaArrowDown,
    FaWallet,
    FaPiggyBank,
    FaMoneyBillWave
} from "react-icons/fa";

function SummaryCard({ title, value }) {

    const getIcon = () => {
        switch (title) {
            case "Today's Spent":
                return <FaArrowDown className="text-red-500 text-xl md:text-2xl" />;
            case "This Month":
                return <FaWallet className="text-orange-500 text-xl md:text-2xl" />;
            case "Income":
                return <FaMoneyBillWave className="text-green-500 text-xl md:text-2xl" />;
            case "Saved":
                return <FaPiggyBank className="text-blue-500 text-xl md:text-2xl" />;
            default:
                return <FaWallet className="text-blue-500 text-xl md:text-2xl" />;
        }
    };

    return (
        <div
            className="
            bg-white
            rounded-2xl
            shadow-sm border border-slate-100
            hover:shadow-md
            transition-all
            duration-300
            hover:-translate-y-1
            p-5 md:p-6"
        >
            <div className="flex justify-between items-start md:items-center">
                <div className="flex flex-col">
                    <p className="text-slate-500 text-xs md:text-sm font-medium uppercase tracking-wider">
                        {title}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-800">
                        ₹{Number(value).toLocaleString()}
                    </h2>
                </div>
                
                {/* The icon container shrinks slightly on mobile */}
                <div className="bg-slate-50 p-3 md:p-4 rounded-full border border-slate-100 shrink-0">
                    {getIcon()}
                </div>
            </div>
        </div>
    );
}

export default SummaryCard;