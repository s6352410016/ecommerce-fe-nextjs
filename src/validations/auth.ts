import { z } from "zod";

export const SignUpFields = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
  password: z.string().trim().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
  phone: z.string().trim().min(1, "Phone number is required"),
  address: z.string().trim().min(1, "Address is required"),
});

export const SignInFields = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
  password: z.string().trim().min(1, "Password is required"),
});