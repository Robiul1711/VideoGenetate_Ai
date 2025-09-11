import OTPInput from "otp-input-react";
import { Controller, useForm } from "react-hook-form";
import logo from "@/assets/images/logo.png";
import { BeatLoader } from "react-spinners";
import CommonButton from "@/components/common/CommonButton";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { showLoadingToast, updateToastError, updateToastSuccess } from "@/lib/utils";
import { useEmail } from "@/hooks/useEmail";
export default function VerifyOtp() {
  const {email,setResetToken} = useEmail();
const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

   const OTPMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/account/reset-password/verify-otp/", data);
      return response?.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Verifying...");
      return { toastId };
    },
    onSuccess: (response, _variables, context) => {
      console.log(response);
      updateToastSuccess(context.toastId, response?.message || "OTP verification successful");
      setResetToken(response?.reset_token);
      navigate("/auth/new-password-set");
    },
    onError: (error, _variables, context) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message 
      updateToastError(context.toastId, errorMessage);
    },
  });
const onSubmit = (data) => {
  OTPMutation.mutate({
    ...data,
    email: email?.email, // not the whole object
  });
};

  return (
    <div className="w-full max-w-lg bg-[#1E1E23]/30 backdrop-blur-sm text-white rounded-xl p-4 sm:p-8 border border-Primary/20">
      {/* Header */}
              <Link to="/" className="flex items-center justify-center mb-4 sm:mb-8">
        <img src={logo} alt="" className="w-12 h-12" />
        </Link>
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl font-semibold  mb-2">Verify Your Email</h1>
        <p className=" text-sm">We’ve sent a 4-digit code to your email.</p>
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
            minLength: { value: 4, message: "OTP must be 4 digits" },
            maxLength: { value: 4, message: "OTP must be 4 digits" },
          }}
          render={({ field }) => (
            <div className="flex justify-center">
              <OTPInput
                value={field.value}
                onChange={field.onChange}
                autoFocus
                OTPLength={4}
                otpType="number"
                disabled={false}
                inputStyles={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 0.4rem",
                  fontSize: "1.4rem",
                  borderRadius: "0.4rem",
                  border: "2px solid #d1d4db",
                  textAlign: "center",
                  outline: "none",
                }}
                focusStyles={{
                  border: "2px solid #3b82f6",
                  boxShadow: "0 0 0 3px rgba(49, 130, 246, 0.4)",
                }}
                className="otp-input-container"
              />
            </div>
          )}
        />
        {errors.otp && (
          <p className="text-center text-sm text-red-400">
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
