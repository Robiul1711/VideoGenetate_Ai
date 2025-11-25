import React from "react";
import { Download, Share2, Edit3 } from "lucide-react";

export default function VideoEditorInterface({ videoData }) {
 const VID_BASE_URL = import.meta.env.VITE_IMG_URL || "";
  // Handler for download
  const handleDownload = async () => {
    try {
      const videoUrl = videoData?.video_url;
      const thumbnail = videoData?.thumbnail;
      const title = videoData?.title || "video";

      if (!videoUrl) {
        console.error("No video URL found");
        return;
      }

      // Fetch video as blob
      const res = await fetch(videoUrl);
      const blob = await res.blob();

      // Create a temporary link to download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.mp4`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log("Thumbnail or other value:", thumbnail);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  // Handler for share
  const handleShare = async () => {
    const shareData = {
      title: videoData?.data?.title || "My Video",
      text: "Check out this video!",
      url: videoData?.data?.video_url || window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully!");
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // fallback
      navigator.clipboard.writeText(shareData.url);
      alert("Sharing is not supported. Link copied to clipboard!");
    }
  };

  return (
    <div className="mt-10">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Preview Section */}
          <div className="relative bg-black rounded-2xl overflow-hidden col-span-2 aspect-video">
            <video
              src={VID_BASE_URL + videoData?.video_url}
              controls
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Video Details Panel */}
          <div className="bg-Primary/5 border border-Primary/30 backdrop-blur-sm rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 ">
                <h2 className="text-white text-lg sm:text-xl font-semibold">
                  Video Details
                </h2>
                {/* <Edit3 className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" /> */}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6 sm:mb-8">
                {videoData?.data?.prompt}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs sm:text-sm">Style</span>
                  <span className="text-white text-sm font-medium">
                    {videoData?.data?.video_type_detail?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs sm:text-sm">
                    Duration
                  </span>
                  <span className="text-white text-sm font-medium">
                    {videoData?.data?.duration || "Processing..."}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs sm:text-sm">
                    Resolution
                  </span>
                  <span className="text-white text-sm font-medium">
                    {videoData?.data?.resolution}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl p-2 text-center transition-all duration-200 hover:scale-105"
                >
                  <Download className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mx-auto mb-1 sm:mb-2" />
                  <span className="text-white text-xs sm:text-sm font-medium">
                    Download
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl p-2 text-center transition-all duration-200 hover:scale-105"
                >
                  <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mx-auto mb-1 sm:mb-2" />
                  <span className="text-white text-xs sm:text-sm font-medium">
                    Share
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
