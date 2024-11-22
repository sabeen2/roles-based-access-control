import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

const protectedRoute = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token missing" });
    }

    const secretKey = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    const userEmail = decoded?.email;

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

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "User not verified, Check your email for verification ",
      });
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
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default protectedRoute;
