import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CommonButton from "@/components/common/CommonButton";
import logo from "@/assets/images/logo.png";
import { useMutation } from "@tanstack/react-query";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";
import { useEmail } from "@/hooks/useEmail";
import useAxiosPublic from "@/hooks/useAxiosPublic";
export default function NewPasswordSet() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { resetToken } = useEmail();
  const axiosPublic = useAxiosPublic();
  console.log(resetToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const newPassword = watch("new_password"); // 👈 watch the right field

  const ResetPassMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post(
        "/account/reset-password/reset/",
        data
      );
      return response?.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Changing password...");
      return { toastId };
    },
    onSuccess: (response, _variables, context) => {
      console.log(response);
      updateToastSuccess(
        context.toastId,
        response?.message || "Password changed successfully"
      );

      navigate("/auth/sign-in");
    },
    onError: (error, _variables, context) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      updateToastError(context.toastId, errorMessage);
    },
  });
  const onSubmit = (data) => {
    ResetPassMutation.mutate({ ...data, reset_token: resetToken });
  };

  return (
    <div className="w-full max-w-lg bg-[#1E1E23]/30 backdrop-blur-sm text-white rounded-xl p-4 sm:p-8 border border-Primary/20">
      {/* Header */}
      <Link to="/" className="flex items-center justify-center mb-4 sm:mb-8">
        <img src={logo} alt="" className="w-12 h-12" />
      </Link>
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl font-semibold mb-2">Set a New Password</h1>
        <p className="text-sm">Create a strong password you’ll remember.</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
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
              {...register("new_password", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              placeholder="••••••••"
              className={`w-full pl-10 pr-12 py-3 border rounded-lg text-sm focus:ring-2 focus:outline-none transition ${
                errors.new_password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.new_password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.new_password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              {...register("confirm_password", {
                required: "Confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              placeholder="••••••••"
              className={`w-full pl-10 pr-12 py-3 border rounded-lg text-sm focus:ring-2 focus:outline-none transition ${
                errors.confirm_password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300"
            >
              {showConfirm ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirm_password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirm_password.message}
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
