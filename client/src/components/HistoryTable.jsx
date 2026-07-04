import HistoryRow from "./HistoryRow";

function HistoryTable({ transactions, loadTransactions }) {
    if (transactions.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 text-center flex flex-col items-center justify-center">
                <div className="text-5xl mb-4">📭</div>
                <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
                    No Transactions Found
                </h2>
                <p className="text-slate-500 mt-2 text-sm md:text-base">
                    Start adding expenses or adjust your search to see them here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3 md:space-y-4">
            {transactions.map((transaction) => (
                <HistoryRow
                    key={transaction._id}
                    transaction={transaction}
                    loadTransactions={loadTransactions}
                />
            ))}
        </div>
    );
}

export default HistoryTable;