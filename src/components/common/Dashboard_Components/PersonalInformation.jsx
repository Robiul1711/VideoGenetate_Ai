import React from "react";
import { useForm } from "react-hook-form";
import { Camera } from "lucide-react";

const PersonalInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted data", data);
    // here you could trigger an API call
  };

  const handlePhotoUpload = () => {
    console.log("Photo upload clicked");
    // you can integrate a file picker or upload modal here
  };

  return (
    <div className=" flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-7xl bg-Primary/10 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8"
      >
        {/* Profile Photo Section */}
        <div className="text-center mb-8">
          <h2 className="text-gray-300 text-sm font-medium mb-6">
            Profile Photo
          </h2>

          <div className="relative inline-block">
            <div
              className="w-24 h-24 bg-gray-700/50 rounded-full border-2 border-gray-600/50 flex items-center justify-center hover:bg-gray-600/50 transition-colors cursor-pointer group"
              onClick={handlePhotoUpload}
            >
              <Camera className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={handlePhotoUpload}
                className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
              >
                Upload photo
              </button>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full bg-transparent border border-yellow-400/60 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-colors"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              })}
              className="w-full bg-transparent border border-yellow-400/60 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-colors"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            Edit Personal Info
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
