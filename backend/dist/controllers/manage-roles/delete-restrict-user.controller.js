"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const deleteRestrictUser = async (req, res) => {
    const { userId, deleteUser, restrictUser } = req.body;
    if (!userId) {
        return res
            .status(400)
            .json({ success: false, error: "User ID is required" });
    }
    try {
        // Fetch the user to ensure they exist
        const user = await prismaClient_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        // Check if the user's email is the protected admin email
        if (user.email === "admin@yopmail.com") {
            return res.status(403).json({
                success: false,
                error: "Cannot restrict or delete the original admin, may lead to problems.",
            });
        }
        // If deleteUser is true, delete the user permanently
        if (deleteUser) {
            await prismaClient_1.default.user.delete({
                where: { id: userId },
            });
            return res
                .status(200)
                .json({ success: true, message: "User deleted successfully" });
        }
        // If restrictUser is true, update the restricted field to true
        // If restrictUser is false, update the restricted field to false
        if (restrictUser !== undefined) {
            await prismaClient_1.default.user.update({
                where: { id: userId },
                data: { restricted: restrictUser },
            });
            return res.status(200).json({
                success: true,
                message: restrictUser
                    ? "User restricted successfully"
                    : "User restriction removed successfully",
            });
        }
        // If neither action is specified, return an error
        return res
            .status(400)
            .json({ success: false, error: "No valid action provided" });
    }
    catch (error) {
        console.error("Error handling user action:", error);
        return res
            .status(500)
            .json({ success: false, error: "Internal Server Error" });
    }
};
exports.default = deleteRestrictUser;
