import React from "react";
import Title from "../common/Title";
import SelectInput from "../Home_Components/SelectInput";
import CommonButton from "../common/CommonButton";
import { FaFileVideo } from "react-icons/fa6";
import { BiSolidCrown } from "react-icons/bi";
import { FaGooglePlay } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import VideoEditorInterface from "../common/Dashboard_Components/VideoEditorInterface";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

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

  // Skeleton/Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading Dashboard...
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
        <SiGoogleanalytics className="text-5xl text-Primary p-3 bg-Primary/10 rounded-full" />
      ),
    },
  ];

  return (
    <div className="p-8 space-y-10">
      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="border border-Primary/30 bg-Primary/10 p-6 md:p-12 rounded-2xl flex gap-6 items-center"
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
      <div className="border border-Primary/30 bg-Primary/10 p-6 md:p-8 rounded-2xl">
        <Title level="title32" className="text-white text-center mb-6">
          Convert Your Ideas Into AI Videos
        </Title>

        <div className="flex flex-col gap-6">
          {/* Video type selector */}
          <div>
            <Title level="title20" className="text-white mb-2">
              Select video type
            </Title>
            <SelectInput />
          </div>

          {/* Prompt input */}
          <div>
            <Title level="title20" className="text-white mb-2">
              Describe your idea
            </Title>
            <textarea
              className="w-full p-3 bg-transparent text-white resize-none text-base font-medium leading-relaxed border border-Primary/30 rounded-lg outline-none placeholder:text-white/60"
              rows={4}
              placeholder="Describe your 3D object or scene..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <CommonButton
          link={"/dashboard/video-editor-interface"}
          variant="secondary"
          className="mt-8 rounded-full flex items-center gap-2 mx-auto"
        >
          Generate Now <FaFileVideo />
        </CommonButton>
      </div>

      {/* Video Editor */}
      <div>
        <VideoEditorInterface />
      </div>
    </div>
  );
};

export default Dashboard;
