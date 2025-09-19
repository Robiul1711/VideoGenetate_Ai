import React from "react";
import Title from "../common/Title";

import { FaFileVideo } from "react-icons/fa6";
import { BiSolidCrown } from "react-icons/bi";
import { FaGooglePlay } from "react-icons/fa";
import { MdOutlineCreditScore } from "react-icons/md";
import VideoEditorInterface from "../common/Dashboard_Components/VideoEditorInterface";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import VideoGeneratorForm from "../common/Dashboard_Components/VideoGeneratorForm";

const Dashboard = () => {
  const AxiosSecure = useAxiosSecure();

  // Fetch dashboard data
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/video-generator/dashboard/");
      return res.data;
    },
  });

if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        {/* Loading text */}
        <p className="text-yellow-500 text-lg font-medium">Loading Dashboard...</p>
      </div>
    </div>
  );
}



  const data = [
    {
      title: "Total Videos Created",
      count: dashboard?.data?.total_videos_created || 0,
      icon: (
        <FaGooglePlay className="text-5xl text-Primary p-3 bg-Primary/10 rounded-full" />
      ),
    },
    {
      title: "Subscription Plan",
      count: dashboard?.data?.subscription_plan || "Free",
      icon: (
        <BiSolidCrown className="text-5xl text-Primary p-3 bg-Primary/10 rounded-full" />
      ),
    },
    {
      title: "Video Credits",
      count: dashboard?.data?.video_credits_total || 0,
      icon: (
        <MdOutlineCreditScore className="text-5xl text-Primary p-3 bg-Primary/10 rounded-full" />
      ),
    },
  ];

  return (
    <div className="p-8 space-y-10">
      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {data.map((item, index) => (
          <div
            key={index}
            className="border border-Primary/30 bg-Primary/10 p-6  rounded-2xl flex gap-6 items-center"
          >
            <div>{item.icon}</div>
            <div>
              <Title level="title24" className="text-white mb-2">
                {item.title}
              </Title>
              <Title level="title32" className="text-white">
                {item.count}
              </Title>
            </div>
          </div>
        ))}
      </div>

      {/* Video Generator Form */}
<VideoGeneratorForm />
    </div>
  );
};

export default Dashboard;
