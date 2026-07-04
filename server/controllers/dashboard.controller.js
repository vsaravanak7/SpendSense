import * as dashboardService from "../services/dashboard.service.js";

export const getDashboard = async (req, res) => {
 
    try {
        const dashboard =
            await dashboardService.getDashboardData(req.user._id);
        res.json({
            success: true,
            dashboard
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};