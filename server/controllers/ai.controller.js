import * as aiService from "../services/ai.service.js";

export const addExpenseUsingAI = async (req, res) => {

    try {

        const { prompt } = req.body;

        const data = await aiService.extractExpense(prompt);

        res.status(200).json({
            success: true,
            transaction: data
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
export const addExpenseFromReceipt = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No receipt uploaded"
            });
        }

        const data = await aiService.extractExpenseFromReceipt(
            req.file.buffer,
            req.file.mimetype
        );

        res.json({
            success: true,
            transaction: data
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};