import React from "react";
import { Check } from "lucide-react";

export default function SubscriptionDashboard() {
  // Calculate progress percentage (34/50 = 68%)
  const progress = (34 / 50) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const features = [
    "Unlimited Videos per Month",
    "Full HD + 4K Resolution",
    "Early Access to New Features",
    "Advanced Story Editing Tools",
    "Multiple Language Voiceovers",
    "Dedicated Rendering Server",
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        {/* Left Section - Plan Details */}
        <div className="space-y-6 text-center lg:text-left">
          <div>
            <div className="flex flex-col sm:flex-row items-center lg:items-start sm:space-x-3 sm:mb-4 mb-6">
              <h1 className="text-white text-2xl sm:text-3xl font-bold">
                Advanced
              </h1>
              <span className="mt-2 sm:mt-0 bg-yellow-400 text-black text-sm font-medium px-3 py-1 rounded-full">
                Current Plan
              </span>
            </div>

            <div className="flex items-baseline justify-center lg:justify-start space-x-1">
              <span className="text-white text-3xl sm:text-4xl font-bold">
                $49.99
              </span>
              <span className="text-gray-400 text-base sm:text-lg">/month</span>
            </div>
          </div>

          <button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors">
            Manage Plan
          </button>
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
                34/50
              </div>
              <div className="text-gray-400 text-xs sm:text-sm mt-1">
                Credits Remaining
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Features List */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-black" strokeWidth={3} />
              </div>
              <span className="text-white text-sm sm:text-base">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
