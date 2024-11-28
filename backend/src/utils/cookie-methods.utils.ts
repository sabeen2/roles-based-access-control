import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../prisma/prismaClient";

interface User {
  id: string;
  email: string;
}

class CookieMethods {
  private static readonly DEFAULT_MAX_AGE = 1000 * 60 * 60 * 24;

  static generateJWT(email: string, days: number = 1): string {
    const maxAge = this.DEFAULT_MAX_AGE * days;
    return jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: maxAge.toString(),
    });
  }

  static async verifyJWT(jwtToken: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(
        jwtToken,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      if (!decoded) {
        console.error("[-] Unauthorized: Invalid JWT payload");
        return null;
      }

      const user = await prisma.user.findFirst({
        where: { email: decoded.email },
      });

      if (!user) {
        console.error("[-] Unauthorized: User does not exist.");
        return null;
      }

      return user;
    } catch (error) {
      console.error("[!] Error in verifyJWT:", error);
      return null;
    }
  }

  static setCookie(res: Response, token: string, days: number = 1): void {
    const maxAge = this.DEFAULT_MAX_AGE * days;
    res.cookie("token", token, {
      maxAge,
      httpOnly: true,
      sameSite: "none",
      // domain:
      //   process.env.NODE_ENV === "development" ? "localhost" : ".vercel.app",
      // domain: process.env.FRONTEND_URL,
      secure: process.env.NODE_ENV !== "development",
      // path: "/",
    });
  }

  static removeCookie(res: Response, cookieName = "token"): void {
    res.clearCookie(cookieName);
  }
}

export default CookieMethods;
