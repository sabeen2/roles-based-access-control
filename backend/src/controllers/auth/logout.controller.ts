import { Request, Response } from "express";
import CookieMethods from "../../utils/cookie-methods.utils";

const logoutUser = (req: Request, res: Response) => {
  // CookieMethods.removeCookie(res);
  res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
};

export default logoutUser;
