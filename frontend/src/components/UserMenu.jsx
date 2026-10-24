import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";

const profileSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores are allowed"),
    email: z.string().trim().email("Enter a valid email address"),
    currentPassword: z.string(),
    newPassword: z.string(),
  })
  .superRefine((values, context) => {
    if (values.newPassword && !values.currentPassword) {
      context.addIssue({
        code: "custom",
        message: "Current password is required",
        path: ["currentPassword"],
      });
    }

    if (values.currentPassword && !values.newPassword) {
      context.addIssue({
        code: "custom",
        message: "Enter a new password",
        path: ["newPassword"],
      });
    }

    if (values.newPassword) {
      if (values.newPassword.length < 8) {
        context.addIssue({ code: "custom", message: "Use at least 8 characters", path: ["newPassword"] });
      }
      if (!/[A-Z]/.test(values.newPassword)) {
        context.addIssue({ code: "custom", message: "Include an uppercase letter", path: ["newPassword"] });
      }
      if (!/[a-z]/.test(values.newPassword)) {
        context.addIssue({ code: "custom", message: "Include a lowercase letter", path: ["newPassword"] });
      }
      if (!/\d/.test(values.newPassword)) {
        context.addIssue({ code: "custom", message: "Include a number", path: ["newPassword"] });
      }
    }
  });

function Field({ label, error, children }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span>{label}</span>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
    </label>
  );
}

function ProfileDialog({ user, onClose }) {
  const { updateProfile } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    reset({
      username: user.username,
      email: user.email,
      currentPassword: "",
      newPassword: "",
    });
  }, [reset, user.email, user.username]);

  async function onSubmit({ username, email, currentPassword, newPassword }) {
    const updates = { username, email };
    if (newPassword) {
      updates.currentPassword = currentPassword;
      updates.newPassword = newPassword;
    }

    try {
      await updateProfile(updates);
      toast.success("Profile updated successfully");
      onClose();
    } catch (error) {
      setError("root", {
        message: error.response?.data?.message || "Unable to update your profile",
      });
    }
  }

  const inputClass = (hasError) =>
    `w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 ${
      hasError
        ? "border-red-500 focus:ring-red-200"
        : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-200"
    }`;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 p-4"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-dialog-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="profile-dialog-title" className="text-xl font-semibold text-slate-900">
              Edit profile
            </h2>
            <p className="mt-1 text-sm text-slate-500">Update your account details or password.</p>
          </div>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Close">
            ×
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          {errors.root && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{errors.root.message}</p>}
          <Field label="Username" error={errors.username}>
            <input className={inputClass(errors.username)} autoComplete="username" {...register("username")} />
          </Field>
          <Field label="Email" error={errors.email}>
            <input className={inputClass(errors.email)} type="email" autoComplete="email" {...register("email")} />
          </Field>
          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm font-medium text-slate-900">Change password <span className="font-normal text-slate-500">(optional)</span></p>
            <div className="mt-3 space-y-4">
              <Field label="Current password" error={errors.currentPassword}>
                <input className={inputClass(errors.currentPassword)} type="password" autoComplete="current-password" {...register("currentPassword")} />
              </Field>
              <Field label="New password" error={errors.newPassword}>
                <input className={inputClass(errors.newPassword)} type="password" autoComplete="new-password" {...register("newPassword")} />
              </Field>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </div>,
    document.body,
  );
}

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const initials = user?.username?.slice(0, 2).toUpperCase() || "U";

  useEffect(() => {
    function closeMenu(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  if (!user) {
    return null;
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open profile menu"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        {initials}
      </button>

      {isOpen && (
        <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-slate-900">{user.username}</p>
            <p className="truncate text-sm text-slate-500">{user.email}</p>
            <p className="mt-2 inline-flex rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium capitalize text-indigo-700">{user.role}</p>
          </div>
          <div className="p-2">
            <button type="button" role="menuitem" onClick={() => { setIsOpen(false); setIsEditing(true); }} className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100">
              Update profile
            </button>
            <button type="button" role="menuitem" onClick={handleLogout} className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50">
              Log out
            </button>
          </div>
        </div>
      )}

      {isEditing && <ProfileDialog user={user} onClose={() => setIsEditing(false)} />}
    </div>
  );
}

export default UserMenu;
