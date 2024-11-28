"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("./prismaClient"));
class CookieMethods {
    static generateJWT(email, days = 1) {
        const maxAge = this.DEFAULT_MAX_AGE * days;
        return jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: maxAge.toString(),
        });
    }
    static async verifyJWT(jwtToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET);
            if (!decoded) {
                console.error("[-] Unauthorized: Invalid JWT payload");
                return null;
            }
            const user = await prismaClient_1.default.user.findFirst({
                where: { email: decoded.email },
            });
            if (!user) {
                console.error("[-] Unauthorized: User does not exist.");
                return null;
            }
            return user;
        }
        catch (error) {
            console.error("[!] Error in verifyJWT:", error);
            return null;
        }
    }
    static setCookie(res, token, days = 7) {
        const maxAge = this.DEFAULT_MAX_AGE * days;
        res.cookie("token", token, {
            maxAge,
            httpOnly: true,
            sameSite: "none",
            // domain:
            //   process.env.NODE_ENV === "development" ? "localhost" : ".vercel.app",
            // domain: process.env.FRONTEND_URL,
            secure: true,
            // path: "/",
        });
    }
    static removeCookie(res, cookieName = "token") {
        res.clearCookie(cookieName);
    }
}
CookieMethods.DEFAULT_MAX_AGE = 1000 * 60 * 60 * 24;
exports.default = CookieMethods;
