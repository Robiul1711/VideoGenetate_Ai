import React from "react";
import Title from "../common/Title";
import PlanPricing from "./PlanPricing";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const ChoosePlan = ({ AllData }) => {
    const axiosPublic = useAxiosPublic();
const { data:Plans, isLoading } = useQuery({
  queryKey: ["plans"],
  queryFn: async () => {
    const res = await axiosPublic.get("plans/");
    return res.data; // return only the data part
  },
});

  return (
    <div className="section-padding-x py-14">
      <Title level="title40" className="text-center text-Primary mb-4">
       {AllData?.plan_section?.title}
      </Title>
      <Title level="title20" className="text-center text-white">
       {AllData?.plan_section?.subtitle}
      </Title>
      <div className="mt-16">
        <PlanPricing Plans={Plans} />
      </div>
    </div>
  );
};

export default ChoosePlan;
