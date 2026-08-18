import Input from "../../components/common/Input";
import { useState } from "react";
import {
  registerUserSchema,
  type RegisterFormType,
} from "../../schema/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import FormError from "../../components/common/FormError";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Register() {
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerUserSchema),
    mode: "onChange",
  });

  const submitForm = async (data: RegisterFormType) => {
    setServerError("");
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...payload } = data;
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        if (result.field) {
          setError(result.field, { message: result.message });
        } else {
          setServerError(result.message || "Registration failed");
        }
        return;
      }
      navigate("/auth/login");
      console.log("Registered successfully:", result);
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="space-y-5 rounded-2xl bg-white p-6 shadow-sm"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Create an account</h1>

        <p className="text-sm text-gray-500">Sign up to get started</p>
      </div>

      <div className="space-y-4">
        <div>
          <Input
            label="Name"
            type="text"
            placeholder="Enter name"
            autoComplete="name"
            {...register("name")}
            aria-invalid={!!errors.name}
          />

          <FormError message={errors.name?.message} />
        </div>

        <div>
          <Input
            label="Email"
            type="email"
            placeholder="xyx@example.com"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />

          <FormError message={errors.email?.message} />
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("password")}
            aria-invalid={!!errors.password}
          />

          <FormError message={errors.password?.message} />
        </div>

        <div>
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
          />

          <FormError message={errors.confirmPassword?.message} />
        </div>
      </div>
      {serverError && <FormError message={serverError} />}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
