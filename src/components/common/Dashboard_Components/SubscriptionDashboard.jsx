import React from "react";
import { Check } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function SubscriptionDashboard() {
  const AxiosSecure = useAxiosSecure();

  // Fetch dashboard data
  const { data: subscription, isLoading } = useQuery({
    queryKey: ["my-subscription"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/my-plan/");
      return res.data;
    },
  });
  console.log(subscription);
  // Skeleton/Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[20vh] text-white">
        Loading Dashboard...
      </div>
    );
  }

  // Handle no subscription case
  if (!subscription?.data?.status) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[20vh] text-white text-center space-y-4">
        <h2 className="text-2xl font-bold">No subscription available</h2>
        <p className="text-gray-400">
          Please purchase a plan to unlock features.
        </p>
        <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg transition-colors">
          Upgrade Plan
        </button>
      </div>
    );
  }

  // Calculate progress percentage
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const progress =
    (subscription?.data?.remaining_video / subscription?.data?.total_video) *
    100;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        {/* Left Section - Plan Details */}
        <div className="space-y-6 text-center lg:text-left">
          <div>
            <div className="flex flex-col sm:flex-row items-center lg:items-start sm:space-x-3 sm:mb-4 mb-6">
              <h1 className="text-white text-2xl sm:text-3xl font-bold">
                {subscription?.data?.plan?.name}
              </h1>
              <span className="mt-2 sm:mt-0 bg-yellow-400 text-black text-sm font-medium px-3 py-1 rounded-full">
                Current Plan
              </span>
            </div>

            <div className="flex items-baseline justify-center lg:justify-start space-x-1">
              <span className="text-white text-3xl sm:text-4xl font-bold">
                $ {subscription?.data?.plan?.price}
              </span>
              {/* <span className="text-gray-400 text-base sm:text-lg">
                /{subscription?.data?.subscription?.plan?.interval_display}
              </span> */}
            </div>
          </div>
        </div>

        {/* Center Section - Credits Circle */}
        <div className="flex justify-center lg:justify-center">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48">
            {/* Background circle */}
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-gray-700"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-yellow-400 transition-all duration-500 ease-out"
              />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-white text-2xl sm:text-3xl font-bold">
                {subscription?.data?.remaining_video}/
                {subscription?.data?.total_video}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm mt-1">
                Credits Remaining
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Features List */}
        <div className="space-y-4">
        <span className="text-white text-sm sm:text-base">
              {subscription?.data?.plan?.description}
            </span>
        </div>
      </div>
    </div>
  );
}
