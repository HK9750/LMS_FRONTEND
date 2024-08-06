import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    name: z.string().describe("name").min(1, "Name is required"),
    email: z.string().describe("email").email({ message: "Invalid Email" }),
    password: z.string().describe("password").min(1, "Password is required"),
    confirmPassword: z
      .string()
      .describe("confirmPassword")
      .min(1, "Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
