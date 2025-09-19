import React from "react";
import { Download, Trash2, Play, X } from "lucide-react";
import dayjs from "dayjs";
import video_file from "@/assets/video/ai.mp4";
import videoimg from "@/assets/images/video-img.png";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showLoadingToast, updateToastError, updateToastSuccess } from "@/lib/utils";
export default function VideoCardInterface({
  project,
  isPlaying,
  onPlay,
  onStop,
}) {
const AxiosSecure=useAxiosSecure();
const queryClient = useQueryClient();
const DeleteMutation=useMutation({
  mutationFn: async (id) => {
    const res = await AxiosSecure.delete(`/video-generator/projects/${id}/`);
    return res.data;
  },
  onMutate: () => {
    const toastId = showLoadingToast("Deleting the video...");
    return { toastId };
  },
  onSuccess: (response, _variables, context) => {
    updateToastSuccess(context.toastId, response?.message || "Video deleted!");
    queryClient.invalidateQueries({ queryKey: ["listVideo"] });
  },
  onError: (error, _variables, context) => {
    console.log(error?.response);
    const errorMessage =
      error.response?.data?.message || "Something went wrong, try again later!!";
    updateToastError(context.toastId, errorMessage);
  },
})
  // Format created_at
  const formattedDate = project?.created_at
    ? dayjs(project.created_at).format("DD MMM YYYY, hh:mm A")
    : "";

  // Format duration (fallback: Processing)
  const formattedDuration =
    project?.duration && project.duration > 0
      ? `${project.duration}s`
      : "Processing...";

  return (

      <div className="bg-Primary/10 text-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Video Thumbnail or Video Player */}
        <div className="relative h-48">
          {isPlaying ? (
            <video
              src={video_file}
              className="w-full h-full object-cover rounded-t-2xl"
              controls
              autoPlay
            />
          ) : (
            <div
              className="relative h-full bg-white/50 backdrop-blur-md  rounded-t-2xl"
              style={{
                backgroundImage: videoimg ? `url(${videoimg})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-t-2xl"></div>

              {/* Time indicator */}
              <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {formattedDuration}
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                  onClick={onPlay}
                >
                  <Play
                    className="w-6 h-6 text-white ml-0.5"
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Close Video Button */}
          {isPlaying && (
            <div
              className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
              onClick={onStop}
            >
              <X className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title and Date */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1 line-clamp-1">{project?.title}</h3>
            <p className="text-sm">{formattedDate}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {/* Download Button */}

            <a
              href={video_file}
              download={`${project.title}.mp4`}
              className="flex-1 flex items-center justify-center space-x-2 bg-transparent border border-yellow-500 text-yellow-600 hover:bg-yellow-50 px-4 py-2.5 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Download</span>
            </a>

            {/* Delete Button */}
            <button onClick={() => DeleteMutation.mutate(project.id)} className="flex items-center justify-center bg-transparent border border-gray-300 text-white hover:text-red-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

  );
}
