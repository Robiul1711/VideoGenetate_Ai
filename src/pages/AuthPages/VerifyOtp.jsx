import OTPInput from "otp-input-react";
import { Controller, useForm } from "react-hook-form";
import logo from "@/assets/images/logo.png";
import { BeatLoader } from "react-spinners";
import CommonButton from "@/components/common/CommonButton";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { showLoadingToast, updateToastError, updateToastSuccess } from "@/lib/utils";
export default function VerifyOtp() {
  const axiosPublic = useAxiosPublic();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

   const OTPMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/account/register/", data);
      return response?.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Registering...");
      return { toastId };
    },
    onSuccess: (response, _variables, context) => {
      updateToastSuccess(context.toastId, response?.message || "Sign-up successful");

      navigate("/auth/sign-in");
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
    OTPMutation.mutate(data);
  };
  return (
    <div className="w-full max-w-lg bg-[#1E1E23]/30 backdrop-blur-sm text-white rounded-xl p-4 sm:p-8 border border-Primary/20">
      {/* Header */}
              <Link to="/" className="flex items-center justify-center mb-4 sm:mb-8">
        <img src={logo} alt="" className="w-12 h-12" />
        </Link>
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl font-semibold  mb-2">Verify Your Email</h1>
        <p className=" text-sm">We’ve sent a 5-digit code to your email.</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-6"
      >
        <Controller
          control={control}
          name="otp"
          rules={{
            required: "OTP is required",
            minLength: { value: 5, message: "OTP must be 5 digits" },
            maxLength: { value: 5, message: "OTP must be 5 digits" },
          }}
          render={({ field }) => (
            <div className="flex justify-center">
              <OTPInput
                value={field.value}
                onChange={field.onChange}
                autoFocus
                OTPLength={5}
                otpType="number"
                disabled={false}
                inputStyles={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 0.5rem",
                  fontSize: "1.5rem",
                  borderRadius: "0.5rem",
                  border: "2px solid #d1d5db",
                  textAlign: "center",
                  outline: "none",
                }}
                focusStyles={{
                  border: "2px solid #3b82f6",
                  boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                }}
                className="otp-input-container"
              />
            </div>
          )}
        />
        {errors.otp && (
          <p className="text-center text-sm text-red-500">
            {errors.otp.message}
          </p>
        )}
        {/* Submit Button */}
        <CommonButton
          type="submit"
          variant="secondary"
          className="w-full h-[44px] flex items-center justify-center "
        >
          {OTPMutation?.isPending ? (
              <BeatLoader
                loading={OTPMutation?.isPending}
                color="white"
                size={12}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "  VerifyOtp"
            )}
        
        </CommonButton>
      </form>
    </div>
  );
}
