import passport from "passport";
import * as authService from "../services/auth.service.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = await authService.signup(name, email, password);

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

        const safeUser = user.toObject();
        delete safeUser.password;

        res.status(201).json({
            success: true,
            message: "Signup successful",
            user: safeUser,
        });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message,
      });
    }

    req.login(user, (err) => {
      if (err) return next(err);

        const safeUser = user.toObject();
        delete safeUser.password;

        res.json({
            success: true,
            message: "Login successful",
            user: safeUser,
        });
    });
  })(req, res, next);
};

export const logout = async (req, res) => {
  try {
    await authService.logout(req);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
    const safeUser = req.user.toObject();
    delete safeUser.password;

    res.json({
        success: true,
        user: safeUser,
    });
};
export const updateProfile = async (req, res) => {

    try {

        const { name } = req.body;

        req.user.name = name;

        await req.user.save();

        res.json({
            success: true,
            user: req.user
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

export const changePassword = async (req, res) => {

    try {

        const {
            currentPassword,
            newPassword
        } = req.body;

        if (req.user.authProvider === "google") {

            return res.status(400).json({
                success: false,
                message: "Google users cannot change password."
            });

        }

        const bcrypt = await import("bcrypt");

        const isMatch =
            await bcrypt.default.compare(
                currentPassword,
                req.user.password
            );

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Current password is incorrect."
            });

        }

        req.user.password =
            await bcrypt.default.hash(newPassword, 10);

        await req.user.save();

        res.json({
            success: true,
            message: "Password updated."
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};