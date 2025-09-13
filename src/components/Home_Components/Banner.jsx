import React from "react";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { MdOutlineArrowOutward } from "react-icons/md";

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
          <Title
            level="title56"
            className="text-center text-Primary mb-6"
          >
            {BannerData?.hero_section?.title}
          </Title>
          <Title
            level="title20"
            className="text-center text-white"
          >
            {BannerData?.hero_section?.subtitle}
          </Title>
          <CommonButton
            link={"/dashboard"}
            variant="secondary"
            className="mt-12 rounded-full flex items-center gap-2"
          >
            Get Start Now <MdOutlineArrowOutward size={20} />
          </CommonButton>
        </>
      )}
    </div>
  );
};

export default Banner;
