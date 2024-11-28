"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientIp = getClientIp;
// export function getClientIp(req: Request): string | undefined {
//   const forwarded = req?.headers["x-forwarded-for"];
//   return typeof forwarded === "string" ? forwarded?.split(",")[0] : req?.ip;
// }
function getClientIp(req) {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") {
        return forwarded.split(",")[0].trim();
    }
    const ip = req.socket.remoteAddress || "";
    return ip === "::1" ? "127.0.0.1" : ip;
}
