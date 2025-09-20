import React, { useState } from "react";
import Title from "../common/Title";
import { motion } from "framer-motion";

import videoimg from "@/assets/images/video-img.png";
import { useAuth } from "@/hooks/useAuth";
import ai from "@/assets/video/ai.mp4";
import AnimatePlaceholder from "./AnimatePlaceholder";
import SearchInput from "../admin/SearchInput";

const VideoGenerate = () => {
  const [searchValue, setSearchValue] = useState("");
  const placeholders = [
    "Describe your scene for an AI video...",
    "Enter a concept to generate a video...",
    "Type a 3D animation idea...",
    "Create a video from your imagination...",
    "Describe a story for an AI video...",
    "Visualize your idea in a short clip...",
    "Generate an AI explainer video...",
    "Create a cinematic AI video scene...",
    "Design an AI-generated character animation...",
    "Turn your text into a video...",
  ];

  // Title text to animate
  const titleText = "Convert Your Ideas Into AI Videos";

  return (
    <div className="section-padding-x mt-16">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 w-full">
        {/* Form Side */}
        <div className="w-full lg:w-1/2">
          <div className="border border-Primary/30 bg-Primary/10 p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-md">
            {/* ✅ Typewriter Title */}
            <h2 className="text-white text-center mb-8 font-bold text-2xl md:text-3xl xl:text-4xl">
              {titleText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </h2>

            <div className="flex flex-col gap-6">
              {/* Video Type Selector */}
              <div>
                <Title
                  level="title20"
                  className="text-white mb-2 font-semibold"
                >
                  Select video type
                </Title>
                <div>
                  <SearchInput
                    disabled={true}
                    className="!w-full cursor-not-allowed"
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    placeholders={placeholders}
                  />
                </div>
              </div>

              {/* Prompt Input */}
              <div>
                <Title
                  level="title20"
                  className="text-white mb-2 font-semibold"
                >
                  Describe your idea
                </Title>
                <AnimatePlaceholder
                  placeholders={placeholders}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Video Side (Right Column) */}
        <div className="w-full lg:w-1/2">
          <div className="border border-Primary/30 rounded-3xl overflow-hidden shadow-lg">
            <video
              className="w-full h-auto object-cover rounded-3xl"
              controls
              // poster={videoimg} // thumbnail image
            >
              <source src={ai} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerate;
