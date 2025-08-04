import React, { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

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
          value={value}
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
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className=" flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f1d14] w-full  rounded-xl p-8 shadow-md border border-yellow-900/30"
      >
        <h2 className="text-white font-semibold text-lg mb-8">
          Change Password <span className="text-yellow-500">🛈</span>
        </h2>

        <PasswordInput
          label="Old Password"
          name="oldPassword"
          value={formData.oldPassword}
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
