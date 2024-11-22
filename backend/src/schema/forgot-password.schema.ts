import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  email: z.string().email(),
  resetPasswordToken: z.string().length(6),
});

export interface IResetPasswordRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
  resetPasswordToken: string;
}
