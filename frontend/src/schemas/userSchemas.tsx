import { z } from "zod";
//reusable pieces
const userName = z
  .string()
  .regex(/^[a-zA-Z0-9]+$/, "Only alphanumeric characters are allowed")
  .min(4, "Username must be at least 4 characters")
  .max(30, "Username must not exceed 30 characters");

const password = z
  .string()
  .min(8, "must be at least 8 characters long")
  .refine((val) => /[a-z]/.test(val), {
    message: "must contain at least one lowercase letter",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "must contain at least one uppercase letter",
  })
  .refine((val) => /\d/.test(val), {
    message: "must contain at least one number",
  })
  .refine((val) => /[!@#$%^&*]/.test(val), {
    message: "one special character ex: !@#$%^&*",
  });

const email = z.string().email("Invalid email address");

//Combined for form validation
export const userLoginSchema = z.object({
  username: userName,
  password: password,
});

export const userRegisterSchema = z
  .object({
    username: userName,
    email: email,
    password: password,
    verifyPassword: password,
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "Passwords do not match",
    path: ["verifyPassword"], // Attach error to the verifyPassword field this is fucking cool
  });
