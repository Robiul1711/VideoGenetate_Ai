import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { BeatLoader } from "react-spinners";
import CommonButton from "@/components/common/CommonButton";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { showLoadingToast, updateToastError, updateToastSuccess } from "@/lib/utils";
export default function ForgetPassword() {
const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

 const ForgotPassMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/account/reset-password/request-otp/", data);
      return response?.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Sending OTP to your email...");
      return { toastId };
    },
    onSuccess: (response, _variables, context) => {
      updateToastSuccess(context.toastId, response?.message || "OTP sent successfully");

      navigate("/auth/verify-otp");
    },
    onError: (error, _variables, context) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, try again later!!";
      updateToastError(context.toastId, errorMessage);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    ForgotPassMutation.mutate(data);
  };
  return (
    <div className="w-full max-w-lg bg-[#1E1E23]/30 backdrop-blur-sm text-white rounded-xl p-4 sm:p-8 border border-Primary/20">
      {/* Header */}
      <Link to="/" className="flex items-center justify-center mb-4 sm:mb-8">
        <img src={logo} alt="" className="w-12 h-12" />
      </Link>
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl font-semibold  mb-2">Forgot Password</h1>
        <p className=" text-sm">Don’t worry! We’ll help you reset it.</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-6"
      >
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium  mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              })}
              placeholder="you@example.com"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:ring-2 focus:outline-none transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end">
          <Link to="/auth/sign-in" className="hover:underline text-Primary">
            Go back to Sign In
          </Link>
        </div>
        {/* Submit Button */}
        <CommonButton
          type="submit"
          variant="secondary"
          className="w-full h-[44px] flex items-center justify-center "
        >
          {ForgotPassMutation?.isPending ? (
              <BeatLoader
                loading={ForgotPassMutation?.isPending}
                color="white"
                size={12}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Send OTP"
            )}
         
        </CommonButton>
      </form>
    </div>
  );
}
