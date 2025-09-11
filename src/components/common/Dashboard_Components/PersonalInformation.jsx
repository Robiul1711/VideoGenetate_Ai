import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Camera, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useAuth } from "@/hooks/useAuth";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";

const PersonalInformation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  
  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch, 
    formState: { errors, isDirty, isValid } 
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      profile_photo: null,
    },
  });

  // Update form values when user changes
  useEffect(() => {
    if (user?.data) {
      setValue("name", user.data.name || "");
      setImagePreview(user.data.profile_photo_url || null);
    }
  }, [user, setValue]);

  // Watch profile photo file input
  const profilePhotoFile = watch("profile_photo");
  useEffect(() => {
    if (profilePhotoFile && profilePhotoFile[0]) {
      const file = profilePhotoFile[0];
      
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        updateToastError(null, "Please select an image file");
        setValue("profile_photo", null);
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        updateToastError(null, "Image size must be less than 5MB");
        setValue("profile_photo", null);
        return;
      }
      
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  }, [profilePhotoFile, setValue]);

const updateProfileMutation = useMutation({
  mutationFn: async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.profile_photo?.[0]) {
      formData.append("profile_photo", data.profile_photo[0]);
    }
    const response = await axiosSecure.patch("/account/profile/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  onMutate: () => {
    const toastId = showLoadingToast("Updating profile...");
    return { toastId }; // return the toastId as context
  },
  onSuccess: (response, _variables, context) => {
    updateToastSuccess(
      context.toastId, // use the toastId from context
      response?.message || "Profile updated successfully"
    );
   
  },
  onError: (error, _variables, context) => {
    console.log(error);
    updateToastError(
      context.toastId, // use the same toastId here
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong!"
    );
  },
});


  const onSubmit = (data) => {
    updateProfileMutation.mutate(data);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setValue("profile_photo", null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-Primary/10 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 md:p-8"
      >
        <h2 className="text-xl font-semibold text-gray-100 mb-6">Personal Information</h2>
        
        {/* Profile Photo Section */}
        <div className="text-center mb-8">
          <h3 className="text-gray-300 text-sm font-medium mb-4">Profile Photo</h3>
          <div className="relative inline-block">
            <div
              className={`w-28 h-28 bg-gray-700/50 rounded-full border-2 border-gray-600/50 flex items-center justify-center hover:bg-gray-600/50 transition-colors cursor-pointer group overflow-hidden ${
                isUploading ? "opacity-70" : ""
              }`}
              onClick={handleImageClick}
            >
              {isUploading ? (
                <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
              ) : imagePreview ? (
                <img
                  src={imagePreview.startsWith('data:') ? imagePreview : VITE_IMG_URL + imagePreview}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
              )}
            </div>
            <input
              type="file"
              id="profile_photo"
              accept="image/jpeg,image/png,image/jpg,image/gif"
              {...register("profile_photo")}
              className="hidden"
              ref={fileInputRef}
            />
            <div className="mt-3 flex justify-center gap-4">
              <button
                type="button"
                onClick={handleImageClick}
                className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
              >
                Upload photo
              </button>
              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 5MB.</p>
          </div>
        </div>

        {/* Name Field */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
            Name
          </label>
          <input
            id="name"
            {...register("name", { 
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters"
              },
              maxLength: {
                value: 50,
                message: "Name must be less than 50 characters"
              }
            })}
            className="w-full bg-transparent border border-yellow-400/60 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-colors"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field (Read-only) */}
        <div className="mb-8">
          <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user?.data?.email || ""}
            className="w-full bg-gray-800/40 border border-gray-700 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
            readOnly
            disabled
          />
          <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isDirty || !isValid || updateProfileMutation.isPending}
            className="bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-400/60 disabled:cursor-not-allowed text-black font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
          >
            {updateProfileMutation.isPending && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;