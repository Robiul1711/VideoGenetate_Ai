import React from "react";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { FaFileVideo } from "react-icons/fa6";
import SelectInput from "./SelectInput";
import videoimg from "@/assets/images/video-img.png";
import { useAuth } from "@/hooks/useAuth";

const VideoGenerate = () => {
  const {user}=useAuth();
  return (
    <div className="section-padding-x mt-16">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 w-full">
        {/* Form Side */}
        <div className="w-full lg:w-1/2">
          <div className="border border-Primary/30 bg-Primary/10 p-4 sm:p-6 md:p-8 rounded-2xl">
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
              variant="secondary"
              className="mt-8 rounded-full flex items-center gap-2 mx-auto"
            >
              Generate Now <FaFileVideo />
            </CommonButton>
          </div>
        </div>

        {/* Image Side */}
        {/* Video Side (Right Column) */}
        <div className="w-full lg:w-1/2">
          <div className="border border-Primary/30 rounded-2xl overflow-hidden">
            <video
              className="w-full h-auto object-cover rounded-2xl"
              controls
              poster={videoimg} // thumbnail image
            >
              <source src="/path-to-your-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerate;
