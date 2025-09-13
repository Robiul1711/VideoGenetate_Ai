import React from "react";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";

const PersonalInformation = () => {
  const axiosSequre = useAxiosSecure();
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm();
  const queryClient = useQueryClient();
  const UpdateProfileMtation = useMutation({
    mutationFn: async (data) => {
      
      const response = await axiosSequre.patch("account/profile/", data);
      return response?.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Updating...");
      return { toastId };
    },
    onSuccess: (response, _variables, context) => {
      // const queryClient = useQueryClient();
      updateToastSuccess(
        context.toastId,
        response?.message || "Profile updated successfully!"
      );
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error, _variables, context) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, try again later!!";
      updateToastError(context.toastId, errorMessage);
    },
  });
  const onSubmit = (data) => {
    console.log("Form Submitted ✅", data);
    UpdateProfileMtation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-Primary/10 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 md:p-8"
      >
        <h2 className="text-xl font-semibold text-gray-100 mb-6">
          Personal Information
        </h2>

        {/* Profile Photo Section */}
        <div className="text-center mb-8">
          <h3 className="text-gray-300 text-sm font-medium mb-4">
            Profile Photo
          </h3>
          <div className="relative inline-block">
            <div className="w-28 h-28 bg-gray-700/50 rounded-full border-2 border-gray-600/50 flex items-center justify-center hover:bg-gray-600/50 transition-colors cursor-pointer group overflow-hidden">
              <img src={VITE_IMG_URL + user?.data?.profile_photo_url} alt="" />
            </div>
          </div>
        </div>

        {/* Name Field */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Name
          </label>
          <input
            defaultValue={user?.data?.name}
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Name must be less than 50 characters",
              },
            })}
            className="w-full bg-transparent border border-yellow-400/60 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-colors"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field (Read-only, no validation) */}
        <div className="mb-8">
          <label
            htmlFor="email"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            defaultValue={user?.data?.email}
            
            readOnly
            disabled
            className="w-full bg-gray-800/40 border border-gray-700 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isDirty || !isValid}
            className="bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-400/60 disabled:cursor-not-allowed text-black font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
