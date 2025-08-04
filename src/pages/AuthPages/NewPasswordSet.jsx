import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CommonButton from "@/components/common/CommonButton";

export default function NewPasswordSet() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    navigate("/auth/sign-in");
    // TODO: submit to backend
  };

  return (
    <div className="w-full max-w-lg bg-[#1E1E23]/30 backdrop-blur-sm text-white rounded-xl p-4 sm:p-8 border border-Primary/20">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl font-semibold mb-2">Set a New Password</h1>
        <p className="text-sm">Create a strong password you’ll remember.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        {/* New Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              placeholder="••••••••"
              className={`w-full pl-10 pr-12 py-3 border rounded-lg text-sm focus:ring-2 focus:outline-none transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              {...register("password_confirmation", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="••••••••"
              className={`w-full pl-10 pr-12 py-3 border rounded-lg text-sm focus:ring-2 focus:outline-none transition ${
                errors.password_confirmation
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300"
            >
              {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password_confirmation && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <CommonButton
          type="submit"
          variant="secondary"
          className="w-full h-[44px] flex items-center justify-center"
        >
Reset Password
        </CommonButton>
      </form>
    </div>
  );
}
