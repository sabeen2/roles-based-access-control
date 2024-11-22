import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export interface ILoginRequestBody {
  email: string;
  password: string;
}