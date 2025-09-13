import React from "react";
import Title from "../common/Title";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoBrushOutline } from "react-icons/io5";
import { PiVideoCameraBold } from "react-icons/pi";
import { HiOutlineShare } from "react-icons/hi";

const icons = {
  "magic-wand": <IoDocumentTextOutline className="w-10 h-10 text-Primary" />,
  book: <IoBrushOutline className="w-10 h-10 text-Primary" />,
  video: <PiVideoCameraBold className="w-10 h-10 text-Primary" />,
  share: <HiOutlineShare className="w-10 h-10 text-Primary" />,
};


const PowerfulFeatures = ({ AllData }) => {
  return (
    <div className="section-padding-x py-14">
      <Title level="title40" className="text-center text-Primary mb-6">
        {AllData?.feature_section?.title}
      </Title>
      <Title level="title20" className="text-center text-white">
        {AllData?.feature_section?.subtitle}
      </Title>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {AllData?.feature_section?.features?.map((item) => (
          <div
            key={item.id}
            className="border border-Primary/30 bg-Primary/10 p-6 rounded-2xl transition-transform transform hover:scale-105 hover:shadow-lg hover:border-Primary/50"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-Primary/20">
              {icons[item.icon]} {/* Only one icon per card */}
            </div>

            <div className="mt-6">
              <Title level="title24" className="text-white mb-2">
                {item.title}
              </Title>
              <p className="text-white text-base font-medium leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PowerfulFeatures;
