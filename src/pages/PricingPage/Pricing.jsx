import MyPricePlan from "@/components/common/Dashboard_Components/MyPricePlan";
import React from "react";

const Pricing = () => {
  return (
    <div className="section-padding-x section-padding-y">
      {/* Top Content */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-Primary">Choose Your Plan</h1>
        <p className="text-lg text-white">
          Select the perfect pricing plan that fits your needs. Upgrade anytime as you grow.
        </p>
      </div>

      {/* Price Plans */}
      <MyPricePlan />
    </div>
  );
};

export default Pricing;
