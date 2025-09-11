import React, { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { showLoadingToast, updateToastSuccess, updateToastError } from "@/lib/utils";

const PasswordInput = ({ label, name, value, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-6">
      <label className="block text-sm text-white mb-2">{label}</label>
      <div className="flex items-center border border-yellow-500 rounded-lg px-4 py-3 bg-[#1a1a11]">
        <FiLock className="text-yellow-500 mr-3" />
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="text-gray-400 hover:text-yellow-400 transition-colors"
        >
          {show ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    </div>
  );
};

const Security = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });
  const axiosSecure = useAxiosSecure();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const changePasswordMutation = useMutation({
  mutationFn: async (data) => {
    const payload = {
      current_password: data.currentPassword,
      new_password: data.newPassword,
      confirm_password: data.repeatPassword,
    };
    const res = await axiosSecure.post("/account/change-password/", payload);
    return res.data;
  },
  onMutate: () => {
    const toastId = showLoadingToast("Changing password...");
    return { toastId }; // return it so it can be used in onSuccess/onError
  },
  onSuccess: (response, _variables, context) => {
    updateToastSuccess(context.toastId, response?.message || "Password changed successfully!");
    setFormData({
      currentPassword: "",
      newPassword: "",
      repeatPassword: "",
    });
  },
  onError: (error, _variables, context) => {
    updateToastError(context.toastId, error.response?.data?.message || "Something went wrong!");
  },
});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.repeatPassword) {
      return updateToastError(null, "New passwords do not match!");
    }
    changePasswordMutation.mutate(formData);
  };

  return (
    <div className="flex items-center justify-center max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f1d14] w-full rounded-xl p-8 shadow-md border border-yellow-900/30"
      >
        <h2 className="text-white font-semibold text-lg mb-8">
          Change Password <span className="text-yellow-500">🛈</span>
        </h2>

        <PasswordInput
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
        />
        <PasswordInput
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
        <PasswordInput
          label="Repeat New Password"
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
        />

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-md transition-colors"
          >
            Save & Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Security;
