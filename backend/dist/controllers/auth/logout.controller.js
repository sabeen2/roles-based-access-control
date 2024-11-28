"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logoutUser = (req, res) => {
    // CookieMethods.removeCookie(res);
    res.status(200).json({
        success: true,
        message: "Logout Successful",
    });
};
exports.default = logoutUser;
