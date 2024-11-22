// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";

// declare module "express-serve-static-core" {
//   interface Request {
//     userInfo: {
//       email: string;
//     };
//   }
// }

// export default async function verifyJwtToken(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<any> {
//   try {
//     const token = req.cookies?.token;

//     if (!token) {
//       return res.status(401).json({ message: "Token not found" });
//     }

//     const secretKey = process.env.JWT_SECRET as string;
//     if (!secretKey) {
//       throw new Error("JWT secret key is not set in environment variables");
//     }

//     let decoded: jwt.JwtPayload;

//     try {
//       decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
//     } catch (error) {
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }

//     const userEmail = decoded?.email;

//     if (!userEmail) {
//       return res.status(400).json({ message: "Email not found " });
//     }

//     req.userInfo = {
//       email: userEmail,
//     };

//     next();
//   } catch (error) {
//     console.error("Error in getUser:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }
