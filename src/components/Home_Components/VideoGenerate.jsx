import React from "react";
import Title from "../common/Title";
import CommonButton from "../common/CommonButton";
import { FaFileVideo } from "react-icons/fa6";
import SelectInput from "./SelectInput";
import videoimg from "@/assets/images/video-img.png";
import { useAuth } from "@/hooks/useAuth";
import ai from "@/assets/video/ai.mp4";
import Swal from "sweetalert2"; // SweetAlert2 for nice alerts

const VideoGenerate = ({ AllData }) => {
  const { user } = useAuth();

  const handleGenerate = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "You need to log in and purchase a plan before generating a video.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      return;
    }

    // Here you can handle video generation logic
    console.log("Video generation started...");
  };

  return (
    <div className="section-padding-x mt-16">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 w-full">
        
        {/* Form Side */}
        <div className="w-full lg:w-1/2">
          <div className="border border-Primary/30 bg-Primary/10 p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-md">
            
            <Title
              level="title32"
              className="text-white text-center mb-8 font-bold"
            >
              Convert Your Ideas Into AI Videos
            </Title>

            <div className="flex flex-col gap-6">
              
              {/* Video Type Selector */}
              <div>
                <Title level="title20" className="text-white mb-2 font-semibold">
                  Select video type
                </Title>
                <SelectInput />
              </div>

              {/* Prompt Input */}
              <div>
                <Title level="title20" className="text-white mb-2 font-semibold">
                  Describe your idea
                </Title>
                <textarea
                  className="w-full p-4 bg-white/10 text-white resize-none text-base font-medium leading-relaxed border border-Primary/40 rounded-xl outline-none placeholder:text-white/60 transition duration-300 focus:ring-2 focus:ring-Primary"
                  rows={5}
                  placeholder="Describe your 3D object or scene..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <CommonButton
              variant="secondary"
              className="mt-8 rounded-full flex items-center gap-2 mx-auto px-6 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-200"
              onClick={handleGenerate}
            >
              Generate Now <FaFileVideo className="text-xl" />
            </CommonButton>
          </div>
        </div>

        {/* Video Side (Right Column) */}
        <div className="w-full lg:w-1/2">
          <div className="border border-Primary/30 rounded-3xl overflow-hidden shadow-lg">
            <video
              className="w-full h-auto object-cover rounded-3xl"
              controls
              poster={videoimg} // thumbnail image
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
