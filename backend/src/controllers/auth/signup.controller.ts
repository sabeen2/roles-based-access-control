import prisma from "../../../prisma/prismaClient";
import {
  ISignupRequestBody,
  userSignupSchema,
} from "../../schema/user-signup.schema";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import CookieMethods from "../../utils/cookie-methods.utils";

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
        message: "Unsupported Data Type or length less that 6 digits",
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

    // Password validation rules
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    // Check if user already exists
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the 'User' role or create one if it doesn't exist
    const userRole = await prisma.role.findUnique({
      where: { name: "User" },
    });

    if (!userRole) {
      return res.status(400).json({
        success: false,
        message:
          "Role 'User' not found in the database. Please contact the admin.",
      });
    }

    // Create new user with the 'User' role
    const newUser = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
        roleId: userRole.id, // Assign the 'User' role
      },
      select: {
        fullName: true,
        email: true,
      },
    });

    // Generate JWT token and set cookie
    const cookie = CookieMethods.generateJWT(newUser.email);
    // CookieMethods.setCookie(res, cookie, 7);

    return res.status(201).json({
      success: true,
      message: "Signup successful. ",
      cookie,
      data: newUser,
    });
  } catch (err) {
    console.error(err); // For debugging purposes
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
}
