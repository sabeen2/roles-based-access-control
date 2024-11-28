"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRoles = void 0;
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const getAllRoles = async (_req, res) => {
    try {
        const roles = await prismaClient_1.default.role.findMany({
            where: { isDeleted: false },
            select: {
                id: true,
                name: true,
                permissions: {
                    select: {
                        id: true,
                        sideBarItem: true,
                        canCreate: true,
                        canRead: true,
                        canUpdate: true,
                        canDelete: true,
                        roleId: true,
                    },
                },
            },
        });
        if (!roles.length) {
            return res
                .status(404)
                .json({ success: false, message: "No roles found" });
        }
        // Send response with filtered data
        res.status(200).json({ success: true, data: roles });
    }
    catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.getAllRoles = getAllRoles;
