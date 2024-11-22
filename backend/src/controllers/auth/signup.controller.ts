import prisma from "../../../prisma/prismaClient";
import {
  ISignupRequestBody,
  userSignupSchema,
} from "../../schema/user-signup.schema";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateVerificationCode } from "../../utils/generate-verification-opt.utils";
import CookieMethods from "../../utils/cookie-methods.utils";
import { sendVerificationEmail } from "../../utils/send-email-verification.utils";

export default async function signup(
  req: Request,
  res: Response
): Promise<void | any> {
  try {
    const validatedData = userSignupSchema.safeParse(
      req.body as ISignupRequestBody
    );

    if (validatedData.error) {
      return res.status(400).json({
        success: false,
        message: "Data validation failed. Unsupported Data Type",
      });
    }

    const { email, fullName, password, confirmPassword } =
      req.body as ISignupRequestBody;

    if (!email || !fullName || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateVerificationCode();

    const newUser = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
        verificationCode,
        verificationCodeExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      select: {
        fullName: true,
        email: true,
      },
    });

    const cookie = CookieMethods.generateJWT(newUser.email);

    CookieMethods.setCookie(res, cookie, 7);

    await sendVerificationEmail({ email, verificationCode });

    return res.status(201).json({
      success: true,
      message: "Signup successful. Please check your email for verification!",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
}
