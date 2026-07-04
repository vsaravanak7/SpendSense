import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const hour = new Date().getHours();
    let greeting = "Good Evening";
    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";

    return (
        <header className="bg-white shadow-sm border-b border-slate-200 px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-20">
            
            {/* Left Side: Greeting & Date */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                    {greeting} 👋
                </h2>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5 md:mt-1 font-medium">
                    {today}
                </p>
            </div>

            {/* Right Side: Actions & Profile */}
            <div className="flex items-center gap-3 md:gap-6">
                
                {/* Notification Bell */}
                <button className="relative p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors focus:outline-none">
                    <FaBell size={20} className="md:text-[22px]" />
                    <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
                </button>

                {/* Profile Chip */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-1.5 pr-2 md:px-4 md:py-2 rounded-full shadow-sm hover:shadow transition-shadow cursor-pointer">
                    <FaUserCircle size={32} className="text-indigo-600 shrink-0" />
                    
                    {/* Text is hidden on mobile screens to save space */}
                    <div className="hidden sm:block pr-2">
                        <p className="font-bold text-slate-800 text-sm leading-tight">
                            SpendSense
                        </p>
                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                            Personal Finance
                        </p>
                    </div>
                </div>

            </div>
        </header>
    );
}

export default Navbar;