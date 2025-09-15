import React, { useState } from "react";
import CommonButton from "../common/CommonButton";
import { MdOutlineArrowOutward } from "react-icons/md";
import Title from "../common/Title";
import discover from "@/assets/images/discover.png";

const DiscoverAi = ({ AllData }) => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  console.log(AllData?.journey_section);
  // State to track active tab
  const [activeTab, setActiveTab] = useState("mission");

  // Content for each tab
  const content = {
    mission: {
      title: AllData?.journey_section?.mission?.header,
      description: AllData?.journey_section?.mission?.content,
    },
    vision: {
      title: AllData?.journey_section?.vision?.header,
      description: AllData?.journey_section?.vision?.content,
    },
    values: {
      title: AllData?.journey_section?.core_values?.header,
      description: AllData?.journey_section?.core_values?.content,
    },
  };

  return (
    <div className="section-padding-x py-14">
      <Title level="title40" className="text-center text-Primary mb-4">
        {AllData?.journey_section?.title}
      </Title>
      <Title level="title20" className="text-center text-white">
        {AllData?.journey_section?.subtitle}
      </Title>

      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-10 mt-26">
        {/* Buttons */}
        <div className="flex flex-wrap md:flex-nowrap md:inline gap-4 md:space-y-4">
          {[
            { id: "mission", label: "Our Mission" },
            { id: "vision", label: "Our Vision" },
            { id: "values", label: "Core Values" },
          ].map((btn) => (
            <CommonButton
              key={btn.id}
              variant="secondary"
              className={`rounded-full flex items-center gap-2 border border-Primary bg-Primary/10 text-white hover:text-black transition-all duration-300
        ${activeTab === btn.id ? "bg-Primary text-black" : ""}`}
              onClick={() => setActiveTab(btn.id)}
            >
              {btn.label} <MdOutlineArrowOutward size={20} />
            </CommonButton>
          ))}
        </div>

        {/* Text Content */}
        <div className="flex flex-col">
          <Title level="title20" className="text-white !font-bold">
            {content[activeTab].title}
          </Title>
          <Title level="title16" className="text-white py-6">
            {content[activeTab].description}
          </Title>
        </div>

        {/* Image */}
        <div>
          <img src={ discover} alt="Discover AI" />
        </div>
      </div>
    </div>
  );
};

export default DiscoverAi;
