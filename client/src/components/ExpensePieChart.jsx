import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#ef4444", // red-500
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
    "#14b8a6", // teal-500
    "#f97316"  // orange-500
];

// A sleek custom tooltip that appears when hovering over slices
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700">
                <p className="text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">
                    {payload[0].name}
                </p>
                <p className="text-lg font-bold text-blue-400">
                    ₹{Number(payload[0].value).toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

function ExpensePieChart({ data }) {
    
    if (!data || data.length === 0) {
        return (
            <div className="w-full h-[300px] flex flex-col items-center justify-center text-slate-400">
                <div className="text-4xl mb-3">📊</div>
                <p className="text-sm font-medium">No expense data available.</p>
            </div>
        );
    }

    return (
        /* Notice there is no bg-white or shadow here, because Dashboard.jsx handles the card styling! */
        <div className="w-full h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        innerRadius={70} // Creates the "donut" hole
                        outerRadius={100}
                        paddingAngle={3} // Spacing between slices
                        stroke="none"    // Removes default border
                        cornerRadius={6} // Rounds the edges of the slices
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                className="transition-all duration-300 hover:opacity-80"
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ExpensePieChart;