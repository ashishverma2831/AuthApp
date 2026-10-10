import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: { email: "" },
  });

  const onSubmit = async (values) => {
    try {
      // Replace with your real API call, e.g. await axios.post("/forgot-password", values)
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Forgot password payload:", values);
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

  // Success state: shown after the request goes through
  if (isSubmitSuccessful && !errors.root) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-md">
          <h1 className="mb-2 text-2xl font-semibold text-slate-900">
            Check your email
          </h1>
          <p className="mb-6 text-sm text-slate-500">
            If an account exists for{" "}
            <span className="font-medium text-slate-700">
              {getValues("email")}
            </span>
            , we've sent a link to reset your password.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md"
      >
        <h1 className="mb-1 text-2xl font-semibold text-slate-900">
          Forgot password?
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          Enter your email and we'll send you a link to reset your password.
        </p>

        {errors.root && (
          <div
            role="alert"
            className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {errors.root.message}
          </div>
        )}

        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
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
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send reset link"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Remembered it?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgetPassword;