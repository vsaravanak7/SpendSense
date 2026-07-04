import { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";

function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[var(--bg)] overflow-hidden w-full">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Responsive Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                
                {/* Mobile Header (Hidden on Desktop) */}
                <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
                    <h1 className="text-xl font-bold text-blue-400">💰 ExpenseAI</h1>
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-slate-300 hover:text-white focus:outline-none"
                    >
                        <FaBars size={24} />
                    </button>
                </div>

                {/* Page Content */}
                <main className="p-4 md:p-8 flex-1 w-full max-w-7xl mx-auto">
                    {children}
                </main>

            </div>
        </div>
    );
}

export default Layout;