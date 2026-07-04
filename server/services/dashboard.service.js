import Transaction from "../models/Transaction.js";
import Budget from "../models/Budget.js";
import mongoose from "mongoose";

// Get category-wise expense totals
export const getCategoryWiseExpenses = async (userId) => {

    const categoryExpenses = await Transaction.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                type: "expense"
            }
        },
        {
            $group: {
                _id: "$category",
                amount: {
                    $sum: "$amount"
                }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                amount: 1
            }
        },
        {
            $sort: {
                amount: -1
            }
        }
    ]);

    return categoryExpenses;
};

export const getDashboardData = async (userId) => {

    const now = new Date();

    const currentMonth = now.getMonth() + 1;

    const currentYear = now.getFullYear();

    const startOfMonth = new Date(currentYear, now.getMonth(), 1);

    const startOfNextMonth = new Date(currentYear, now.getMonth() + 1, 1);

    const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    // Current month transactions
    const transactions = await Transaction.find({
        user: userId,
        transactionDate: {
            $gte: startOfMonth,
            $lt: startOfNextMonth
        }
    }).sort({
        transactionDate: -1
    });

    let monthSpent = 0;
    let monthIncome = 0;
    let todaySpent = 0;

    transactions.forEach((transaction) => {

        if (transaction.type === "expense") {

            monthSpent += transaction.amount;

            if (transaction.transactionDate >= startOfToday) {
                todaySpent += transaction.amount;
            }

        } else {

            monthIncome += transaction.amount;

        }

    });

    const amountSaved = monthIncome - monthSpent;

    const budget = await Budget.findOne({
        user: userId,
        month: currentMonth,
        year: currentYear
    });

    let budgetData = null;

    if (budget) {

        const percentage =
            (monthSpent / budget.budgetLimit) * 100;

        budgetData = {
            limit: budget.budgetLimit,
            used: monthSpent,
            remaining: budget.budgetLimit - monthSpent,
            percentage,
            warning:
                percentage >= budget.warningPercentage
        };

    }

    const categoryExpenses =
        await getCategoryWiseExpenses(userId);

    return {

        todaySpent,

        monthSpent,

        monthIncome,

        amountSaved,

        budget: budgetData,

        recentTransactions: transactions.slice(0, 5),

        categoryExpenses

    };

};