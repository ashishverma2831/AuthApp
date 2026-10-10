import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
 
const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Only letters, numbers and underscores are allowed"
      ),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[a-z]/, "Include at least one lowercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
 
function Field({ id, label, error, children }) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
 
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({ ...payload }) => {
    try {
      // Replace with your real API call, e.g. await axios.post("/register", payload)
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Register payload:", payload);
      reset();
    } catch {
      setError("root", { message: "Something went wrong. Please try again." });
    }
  };
 
  const inputClass = (hasError) =>
    `w-full rounded-lg border px-3 py-2 text-sm text-slate-900 outline-none transition focus:ring-2 ${
      hasError
        ? "border-red-500 focus:ring-red-200"
        : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
    }`;
 
  const passwordType = showPassword ? "text" : "password";
 

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md"
      >
        <h1 className="mb-1 text-2xl font-semibold text-slate-900">
          Create account
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          Fill in the details below to sign up.
        </p>
 
        {errors.root && (
          <div
            role="alert"
            className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {errors.root.message}
          </div>
        )}
 
        {isSubmitSuccessful && !errors.root && (
          <div
            role="status"
            className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700"
          >
            Account created successfully.
          </div>
        )}
 
        <Field id="username" label="Username" error={errors.username}>
          <input
            id="username"
            type="text"
            autoComplete="username"
            placeholder="john_doe"
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? "username-error" : undefined}
            className={inputClass(errors.username)}
            {...register("username")}
          />
        </Field>
 
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(errors.email)}
            {...register("email")}
          />
        </Field>
 
        <Field id="password" label="Password" error={errors.password}>
          <div className="relative">
            <input
              id="password"
              type={passwordType}
              autoComplete="new-password"
              placeholder="Create a password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`${inputClass(errors.password)} pr-16`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 px-3 text-xs font-medium text-slate-500 hover:text-slate-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Field>
 
        <Field
          id="confirmPassword"
          label="Confirm password"
          error={errors.confirmPassword}
        >
          <div className="relative">
          <input
            id="confirmPassword"
            type={passwordType}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword ? "confirmPassword-error" : undefined
            }
            className={inputClass(errors.confirmPassword)}
            {...register("confirmPassword")}
          />
          <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 px-3 text-xs font-medium text-slate-500 hover:text-slate-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Field>

        <span className="text-sm flex justify-end text-slate-500">
          Already have an account?
          <Link to="/login" className="text-sm mb-4 font-medium text-indigo-600 hover:text-indigo-700">
           Log in
        </Link>
        </span>
 
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>
      </form>
    </div>
    </>
  )
}

export default Register