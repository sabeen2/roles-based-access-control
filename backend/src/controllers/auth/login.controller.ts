import { Request, Response } from "express";
import {
  ILoginRequestBody,
  userLoginSchema,
} from "../../schema/user-login.schema";
import prisma from "../../utils/prismaClient";
import CookieMethods from "../../utils/cookie-methods.utils";
import bcrypt from "bcrypt";
// import rateLimiter from "../../utils/rate-limiter.utils";

export default async function login(req: Request, res: Response): Promise<any> {
  // Validate request data
  const validatedData = userLoginSchema.safeParse(req.body);
  if (validatedData.error) {
    return res.status(400).json({
      success: false,
      message: "Unsupported Data Type or length less that 6 digits",
    });
  }

  const { email, password } = req.body as ILoginRequestBody;

  // Check for missing fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
    });
  }

  try {
    // Fetch user from database
    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        email: true,
        fullName: true,
        password: true,
        isDeleted: true,
        restricted: true,
      },
    });

    // Check if user exists
    if (!user || user.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "User does not exist.",
      });
    }

    // Check if user is restricted
    if (user.restricted) {
      return res.status(403).json({
        success: false,
        message: "Your account is deactivated. Please contact admin.",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password. Please try again.",
      });
    }

    // Generate JWT token and set cookie
    const token = CookieMethods.generateJWT(user.email);
    // CookieMethods.setCookie(res, token, 7);

    // Successful login response
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      data: {
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
