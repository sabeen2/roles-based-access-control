"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getUser;
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
async function getUser(req, res) {
    try {
        const { email } = req === null || req === void 0 ? void 0 : req.user;
        const user = await prismaClient_1.default.user.findFirst({
            where: { email },
            select: {
                email: true,
                fullName: true,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "User fetched successfully",
            data: user,
        });
    }
    catch (error) {
        console.error("Error in getUser:", error);
        return res.status(500).json({ message: "Internal Server Error " });
    }
}
