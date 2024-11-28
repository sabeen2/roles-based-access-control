"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const protectedRoute = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: "Not authorized, token missing" });
        }
        const secretKey = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        const userEmail = decoded === null || decoded === void 0 ? void 0 : decoded.email;
        if (!userEmail) {
            return res
                .status(401)
                .json({ success: false, message: "Not authorized, invalid token" });
        }
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Not authorized, user not found" });
        }
        if (user.isDeleted) {
            return res
                .status(403)
                .json({ success: false, message: "Access denied, user doesn't exist" });
        }
        if (user.restricted) {
            return res
                .status(403)
                .json({ success: false, message: "Access denied, user is restricted" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Authentication Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
exports.default = protectedRoute;
