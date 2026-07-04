import { Link, useLocation } from "react-router-dom";
import {
    FaHome,
    FaPlusCircle,
    FaRobot,
    FaReceipt,
    FaHistory,
    FaWallet,
    FaUser,
    FaTimes
} from "react-icons/fa";

function Sidebar({ isOpen, setIsOpen }) {
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
        { name: "Add Expense", path: "/add-expense", icon: <FaPlusCircle /> },
        { name: "AI Expense", path: "/ai-expense", icon: <FaRobot /> },
        { name: "Scan Receipt", path: "/receipt", icon: <FaReceipt /> },
        { name: "History", path: "/history", icon: <FaHistory /> },
        { name: "Budget", path: "/budget", icon: <FaWallet /> },
        { name: "Profile", path: "/profile", icon: <FaUser /> }
    ];

    return (
        <aside 
            className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col shadow-2xl
                transition-transform duration-300 ease-in-out
                lg:static lg:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
        >
            {/* Logo & Close Button (Mobile Only) */}
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-blue-400">💰 SpendSense</h1>
                    <p className="text-sm text-slate-400 mt-1">Smart Finance Tracker</p>
                </div>
                {/* Mobile Close Button */}
                <button 
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden text-slate-400 hover:text-white p-2"
                >
                    <FaTimes size={20} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 mt-6 px-4 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)} // Close sidebar on click (mobile)
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200
                        ${
                            location.pathname === item.path
                                ? "bg-blue-600 text-white shadow-lg"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-5 border-t border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                        S
                    </div>
                    <div>
                        <p className="font-semibold">Welcome!</p>
                        <p className="text-xs text-green-400">● Online</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;