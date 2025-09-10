import React, { useState } from "react";
import CommonButton from "../common/CommonButton";
import { MdOutlineArrowOutward } from "react-icons/md";
import Title from "../common/Title";
import discover from "@/assets/images/discover.png";

const DiscoverAi = () => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("mission");

  // Content for each tab
  const content = {
    mission: {
      title: "Our Mission",
      description:
        "Our mission is to democratize the power of artificial intelligence by creating tools that are not just smart, but also simple to use. We aim to empower individuals and businesses to innovate faster, work smarter, and grow sustainably with the help of AI.",
    },
    vision: {
      title: "Our Vision",
      description:
        "We envision a world where AI solutions are accessible to everyone, enabling seamless innovation and intelligent decision-making across industries.",
    },
    values: {
      title: "Core Values",
      description:
        "We prioritize transparency, usability, and ethical AI development to ensure our tools positively impact businesses and society.",
    },
  };

  return (
    <div className="section-padding-x py-14">
      <Title level="title40" className="text-center text-Primary mb-4">
        Discover Our AI-Powered Journey
      </Title>
      <Title level="title20" className="text-center text-white">
        From concept to code, we build intelligent solutions that transform the way
        businesses operate
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
          <img src={discover} alt="Discover AI" />
        </div>
      </div>
    </div>
  );
};

export default DiscoverAi;

