import Banner from "@/components/Home_Components/Banner";
import ChoosePlan from "@/components/Home_Components/ChoosePlan";
import DiscoverAi from "@/components/Home_Components/DiscoverAi";
import PowerfulFeatures from "@/components/Home_Components/PowerfulFeatures";
import VideoGenerate from "@/components/Home_Components/VideoGenerate";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const res = await axiosPublic.get("cms/");
      return res.data; // return only the data part
    },
  });

  const AllData = data?.data || [];
  return (
    <div>
      <div className="section-padding-y">
        <Banner BannerData={AllData} isLoading={isLoading} />
        <VideoGenerate AllData={AllData} />
      </div>
      <PowerfulFeatures AllData={AllData} />
      <DiscoverAi AllData={AllData} />
      <ChoosePlan AllData={AllData} />
    </div>
  );
};

export default Home;
