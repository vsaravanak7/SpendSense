import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import HistoryTable from "../components/HistoryTable";

function History() {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const res = await api.get("/transactions");
            setTransactions(res.data.transactions);
        } catch (err) {
            console.error("Failed to load transactions", err);
        }
    };

    const filteredTransactions = transactions.filter((transaction) =>
        transaction.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                        Transaction History
                    </h1>
                    <p className="text-slate-500 mt-1 md:mt-2">
                        {filteredTransactions.length} Transactions found
                    </p>
                </div>

                {/* Polished Search Bar */}
                <div className="relative w-full md:w-auto mt-2 md:mt-0">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                        🔍
                    </span>
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full md:w-72 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <HistoryTable
                transactions={filteredTransactions}
                loadTransactions={loadTransactions}
            />
        </Layout>
    );
}

export default History;