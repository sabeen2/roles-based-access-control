"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = rateLimiter;
const rateLimitMap = new Map();
const MAX_ATTEMPTS = 5;
const TIME_WINDOW = 3 * 60 * 1000;
const LOCKOUT_DURATION = 30 * 60 * 1000;
async function rateLimiter(ip) {
    const currentTime = Date.now();
    const userRateInfo = rateLimitMap.get(ip);
    if (userRateInfo) {
        const { attempts, lastAttempt } = userRateInfo;
        if (attempts >= MAX_ATTEMPTS &&
            currentTime - lastAttempt < LOCKOUT_DURATION) {
            return true;
        }
        if (currentTime - lastAttempt > TIME_WINDOW) {
            rateLimitMap.set(ip, { attempts: 1, lastAttempt: currentTime });
        }
        else {
            rateLimitMap.set(ip, {
                attempts: attempts + 1,
                lastAttempt: currentTime,
            });
        }
    }
    else {
        rateLimitMap.set(ip, { attempts: 1, lastAttempt: currentTime });
    }
    return false;
}
