import express from "express";
import {
  signup,
  login,
  logout,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import isAuthenticated from "../middleware/auth.middleware.js";
import passport from "passport";
import {
    updateProfile,
    changePassword
} from "../controllers/auth.controller.js";

const router = express.Router();

// Local Authentication
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Current Logged-in User
router.get("/me", isAuthenticated, getCurrentUser);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:5173/login"
    }),
    (req, res) => {
        res.redirect(
            "http://localhost:5173/dashboard"
        );
    }
);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.put(
    "/profile",
    isAuthenticated,
    updateProfile
);

router.put(
    "/change-password",
    isAuthenticated,
    changePassword
);

export default router;