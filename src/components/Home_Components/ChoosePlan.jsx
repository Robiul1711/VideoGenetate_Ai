import React from "react";
import Title from "../common/Title";
import PlanPricing from "./PlanPricing";

const ChoosePlan = () => {
  return (
    <div className="section-padding-x py-14">
      <Title level="title40" className="text-center text-Primary mb-4">
        Choose the Plan That Fits Your Storytelling Journey
      </Title>
      <Title level="title20" className="text-center text-white">
        Unlock the power of AI video creation with flexible plans whether you're
        just starting or scaling your content creation.
      </Title>
      <div className="mt-16">
        <PlanPricing />
      </div>
    </div>
  );
};

export default ChoosePlan;
