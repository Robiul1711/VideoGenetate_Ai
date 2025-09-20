import ChoosePlan from "@/components/Home_Components/ChoosePlan";
import React from "react";

const Pricing = () => {
  return (
    <div className="section-padding-x section-padding-y">
      {/* Top Content */}
      <div className="text-center ">
        <h1 className="text-4xl font-bold mb-4 text-Primary">Choose Your Plan</h1>
        <p className="text-lg text-white">
          Select the perfect pricing plan that fits your needs. Upgrade anytime as you grow.
        </p>
      </div>

      {/* Price Plans */}
      <ChoosePlan />
    </div>
  );
};

export default Pricing;
