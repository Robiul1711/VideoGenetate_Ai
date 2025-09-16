import React from "react";
import Title from "../common/Title";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
const Banner = ({ BannerData, isLoading }) => {
  return (
    <div className="section-padding-x flex items-center justify-center w-full max-w-[1350px] mx-auto flex-col">
      {isLoading ? (
        // 🔹 Skeleton Loader
        <div className="animate-pulse w-full flex flex-col items-center">
          <div className="h-10 w-2/3 bg-gray-700 rounded mb-6"></div>
          <div className="h-6 w-1/2 bg-gray-700 rounded mb-4"></div>
          <div className="h-10 w-40 bg-gray-700 rounded-full mt-12"></div>
        </div>
      ) : (
        // 🔹 Actual Content
        <>
          <Title level="title56" className="text-center text-Primary mb-6">
            {BannerData?.hero_section?.title}
          </Title>
          <Title level="title20" className="text-center text-white">
            {BannerData?.hero_section?.subtitle}
          </Title>

         <Link
  to="/dashboard"
  className="group relative flex border border-Primary/50 cursor-pointer items-center rounded-full bg-transparent mt-12"
>
  <div
    className="relative flex items-center overflow-hidden"
    style={{ minWidth: "180px" }}
  >
    <span className="flex h-11 w-11 items-center rounded-full bg-Primary px-3 transition-all duration-500 ease-in-out group-hover:w-full group-hover:justify-between">
      <FaArrowRightLong className="text-black transform translate-x-0 transition-transform duration-500 ease-in-out group-hover:translate-x-2" />
      <span className="absolute right-6 translate-y-8 font-semibold text-black transition-all duration-500 ease-in-out group-hover:translate-y-0">
        Get Start Now
      </span>
    </span>
    <p className="absolute right-6 font-semibold opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-y-8 text-white">
      Get Start Now
    </p>
  </div>
</Link>

        </>
      )}
    </div>
  );
};

export default Banner;
