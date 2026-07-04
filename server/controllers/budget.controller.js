import * as budgetService from "../services/budget.service.js";

// Create / Update
export const createOrUpdateBudget = async (req, res) => {
  try {
    const { month, year, budgetLimit, warningPercentage } = req.body;

    const budget = await budgetService.createOrUpdateBudget(
      req.user._id,
      month,
      year,
      budgetLimit,
      warningPercentage
    );

    res.status(200).json({
      success: true,
      budget,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get
export const getBudget = async (req, res) => {
  try {
    const { month, year } = req.query;

    const budget = await budgetService.getBudget(
      req.user._id,
      month,
      year
    );

    res.json({
      success: true,
      budget,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete
export const deleteBudget = async (req, res) => {
  try {
    const { month, year } = req.body;

    await budgetService.deleteBudget(
      req.user._id,
      month,
      year
    );

    res.json({
      success: true,
      message: "Budget deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};