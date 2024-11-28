"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const getAllUsers = async (req, res) => {
    try {
        const users = await prismaClient_1.default.user.findMany({
            where: { isDeleted: false },
            select: {
                id: true,
                fullName: true,
                email: true,
                restricted: true,
                role: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return res.status(200).json({ success: true, users });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res
            .status(500)
            .json({ success: false, error: "Internal Server Error" });
    }
};
exports.default = getAllUsers;
