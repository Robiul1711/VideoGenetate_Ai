import React, { useEffect, useState, useRef } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useFormContext } from "react-hook-form";

const SelectInput = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Select Option");
  const dropdownRef = useRef(null);

  const AxiosSecure = useAxiosSecure();
  const { setValue } = useFormContext();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/categories/");
      return res.data;
    },
  });

  // CLOSE when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Button */}
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full border border-Primary/30 rounded-md text-white justify-between px-3 py-2 flex items-center gap-8 cursor-pointer"
      >
        {selectedItem}
        <IoChevronDown
          className={`${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          } transition-all duration-300 text-[1.2rem]`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`${
          isDropdownOpen
            ? "opacity-100 scale-100 z-10"
            : "opacity-0 scale-90 pointer-events-none z-[-1]"
        } absolute w-full top-12 left-0 bg-white text-black rounded-xl flex flex-col overflow-hidden transition-all duration-300`}
        style={{ boxShadow: "0 15px 60px -15px rgba(0, 0, 0, 0.3)" }}
      >
        {categories?.data?.map((option) => (
          <p
            key={option.id}
            className="py-2 px-4 hover:bg-Primary/80 font-semibold transition cursor-pointer"
       onClick={() => {
  setSelectedItem(option.name);
  setValue("category_id", option.id, { shouldValidate: true });
  setIsDropdownOpen(false);
}}
          >
            {option.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SelectInput;
