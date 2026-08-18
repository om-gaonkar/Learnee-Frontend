import z from "zod";

export const loginUserSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(8, "password must be atleast 8 characters"),

});

const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const whitespaceRegex = /^\S+$/;

const passwordRegex = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
};

export const registerUserSchema = z
  .object({
    name: z
      .string()
      .min(2, "First Name must be at least 2 characters")
      .max(50, "First Name is too large")
      .regex(nameRegex, "Only letters are allowed")
      .regex(whitespaceRegex, "Spaces are not allowed"),
    email: z.string().trim().toLowerCase().email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password is too large")
      .regex(passwordRegex.lowercase, "Must contain a lowercase letter")
      .regex(passwordRegex.uppercase, "Must contain an uppercase letter")
      .regex(passwordRegex.number, "Must contain a number")
      .regex(passwordRegex.special, "Must contain a special character")
      .regex(whitespaceRegex, "Spaces are not allowed"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormType = z.infer<typeof registerUserSchema>;

export type LoginFormType = z.infer<typeof loginUserSchema>;
