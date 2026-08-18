import Input from "../../components/common/Input";
import FormError from "../../components/common/FormError";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { loginUserSchema, type LoginFormType } from "../../schema/zodSchema";
import { useAuthContext } from "../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Login() {
  const [serverError, setServerError] = useState("");
  const { setIsAuthenticated, setUser } = useAuthContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginUserSchema),
    mode: "onChange",
  });

  const submitForm = async (data: LoginFormType) => {
    setServerError("");

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.field) {
          setError(result.field, {
            message: result.message,
          });
        } else {
          setServerError(result.message || "Login failed");
        }

        return;
      }

      console.log("Logged in successfully:", result);

      navigate("/");
      setIsAuthenticated(true);
      setUser(result?.user);
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
        <h1 className="text-2xl font-semibold">Welcome back</h1>

        <p className="text-sm text-gray-500">Sign in to your account</p>
      </div>

      <div className="space-y-4">
        <div>
          <Input
            label="Email"
            type="email"
            placeholder="xyz@example.com"
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
            autoComplete="current-password"
            {...register("password")}
            aria-invalid={!!errors.password}
          />

          <FormError message={errors.password?.message} />
        </div>
      </div>

      {serverError && <FormError message={serverError} />}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}
