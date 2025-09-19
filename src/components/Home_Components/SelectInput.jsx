import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useFormContext } from "react-hook-form";

const SelectInput = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Select Option");

  const AxiosSecure = useAxiosSecure();
  const { setValue } = useFormContext(); // Sync with RHF

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/video-generator/video_type/");
      return res.data;
    },
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <button
        type="button"
        className="w-full border border-Primary/30 rounded-md text-white justify-between px-3 py-2 flex items-center gap-8 relative cursor-pointer dropdown"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedItem}
        <IoChevronDown
          className={`${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          } transition-all duration-300 text-[1.2rem]`}
        />
        <div
          className={`${
            isDropdownOpen
              ? "z-[1] opacity-100 scale-100 text-black"
              : "z-[-1] opacity-0 scale-90"
          } w-full absolute top-12 left-0 bg-white rounded-xl flex  flex-wrap overflow-hidden transition-all duration-300 ease-in-out`}
          style={{ boxShadow: "0 15px 60px -15px rgba(0, 0, 0, 0.3)" }}
        >
          {categories?.data?.map((option, index) => (
            <p
              key={index}
              className="py-2 px-4 hover:bg-Primary/80 font-semibold transition-all  flex items-start  duration-200 cursor-pointer"
              onClick={() => {
                setSelectedItem(option.name);

                setValue("video_type", option.slug, { shouldValidate: true }); // update RHF
                setIsDropdownOpen(false);
              }}
            >
              {option.name}
            </p>
          ))}
        </div>
      </button>
    </div>
  );
};

export default SelectInput;
