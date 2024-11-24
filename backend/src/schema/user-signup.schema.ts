import { z } from "zod";

export const userSignupSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export interface ISignupRequestBody {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
