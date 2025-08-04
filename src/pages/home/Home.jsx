import Banner from "@/components/Home_Components/Banner";
import ChoosePlan from "@/components/Home_Components/ChoosePlan";
import DiscoverAi from "@/components/Home_Components/DiscoverAi";
import PowerfulFeatures from "@/components/Home_Components/PowerfulFeatures";
import VideoGenerate from "@/components/Home_Components/VideoGenerate";
import React from "react";

const Home = () => {
  return (
    <div>
      <div className="section-padding-y">
        <Banner />
        <VideoGenerate />
      </div>
      <PowerfulFeatures />
      <DiscoverAi />
      <ChoosePlan />
    </div>
  );
};

export default Home;
