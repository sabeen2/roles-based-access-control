import { Request, Response } from "express";
import {
  ILoginRequestBody,
  userLoginSchema,
} from "../../schema/user-login.schema";
import prisma from "../../../prisma/prismaClient";
import CookieMethods from "../../utils/cookie-methods.utils";
import bcrypt from "bcrypt";
// import rateLimiter from "../../utils/rate-limiter.utils";

export default async function login(req: Request, res: Response): Promise<any> {
  const validatedData = userLoginSchema.safeParse(req.body);
  if (validatedData.error) {
    return res.status(400).json({
      success: false,
      message: "Data validation failed. Unsupported Data Type",
    });
  }

  const { email, password } = req.body as ILoginRequestBody;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
    });
  }

  //   const clientIp = getClientIp(req);

  try {
    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        email: true,
        fullName: true,
        password: true,
      },
    });

    const isPasswordValid =
      user && (await bcrypt.compare(password, user.password));

    if (!user || !isPasswordValid) {
      //   const rateLimitExceeded = await rateLimiter(clientIp as string);

      //   if (rateLimitExceeded) {
      //     return res.status(429).json({
      //       success: false,
      //       message: "Too many login attempts. Please try again later.",
      //     });
      //   }
      return res.status(401).json({
        success: false,
        message: "Invalid email or password. Please try again.",
      });
    }

    const token = CookieMethods.generateJWT(user.email);
    CookieMethods.setCookie(res, token, 7);

    return res.status(200).json({
      success: true,
      message: "User Logged In successfully",
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
