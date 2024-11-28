"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const changeUserRole = async (req, res) => {
    const { userId, roleId } = req.body;
    if (!userId || !roleId) {
        return res
            .status(400)
            .json({ success: false, message: "userId and roleId are required" });
    }
    try {
        const user = await prismaClient_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        const role = await prismaClient_1.default.role.findUnique({
            where: { id: roleId },
        });
        if (!role) {
            return res
                .status(404)
                .json({ success: false, message: "Role not found" });
        }
        await prismaClient_1.default.user.update({
            where: { id: userId },
            data: { roleId },
            include: { role: true },
        });
        return res.status(200).json({
            success: true,
            message: "Role assigned successfully",
        });
    }
    catch (error) {
        console.error("Error assigning role:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};
exports.default = changeUserRole;
