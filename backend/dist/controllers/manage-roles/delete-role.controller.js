"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = void 0;
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const deleteRole = async (req, res) => {
    const { id } = req.body;
    // Validate input
    if (!id) {
        return res
            .status(400)
            .json({ success: false, message: "Role ID is required" });
    }
    try {
        // Check if the role exists
        const role = await prismaClient_1.default.role.findUnique({ where: { id } });
        if (!role) {
            return res
                .status(404)
                .json({ success: false, message: "Role not found" });
        }
        if (role.name === "Admin" || role.name === "User") {
            return res.status(400).json({
                success: false,
                message: "Admin / User are permanent role cannot delete",
            });
        }
        await prismaClient_1.default.role.delete({ where: { id } });
        res
            .status(200)
            .json({ success: true, message: "Role deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting role:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.deleteRole = deleteRole;
