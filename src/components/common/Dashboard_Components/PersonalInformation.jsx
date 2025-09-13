import React, { useEffect, useState } from "react";
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
  const axiosSecure = useAxiosSecure();
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState(
    VITE_IMG_URL + user?.data?.profile_photo_url
  );
  useEffect(() => {
    if (user?.data?.profile_photo_url) {
      setPreview(VITE_IMG_URL + user.data.profile_photo_url);
    }
  }, [user, VITE_IMG_URL]);
const {
  register,
  handleSubmit,
  formState: { errors },
  setValue,
  reset,
} = useForm({
  defaultValues: {
    name: "",
    profile_photo: null,
  },
});

// when user data comes, reset the form values
useEffect(() => {
  if (user?.data) {
    reset({
      name: user.data.name || "",
      profile_photo: null,
    });
  }
}, [user, reset]);


  const updateProfileMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosSecure.patch("account/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response?.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Updating...");
      return { toastId };
    },
    onSuccess: (response, _variables, context) => {
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
    updateProfileMutation.mutate(data);
  };
  console.log(preview);
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
            <label className="w-28 h-28 rounded-full border-2 border-gray-600/50 flex items-center justify-center bg-gray-700/50 hover:bg-gray-600/50 transition-colors cursor-pointer overflow-hidden group">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8 text-gray-400" />
              )}
              <input
                type="file"
                accept="image/*"
                {...register("profile_photo")}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setPreview(URL.createObjectURL(file));
                    setValue("profile_photo", file); // keep RHF sync
                  }
                }}
              />
            </label>
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
            id="name"
  
            {...register("name")}
            className="w-full bg-transparent border border-yellow-400/60 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-colors"
            placeholder="Enter your name"
          />
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
