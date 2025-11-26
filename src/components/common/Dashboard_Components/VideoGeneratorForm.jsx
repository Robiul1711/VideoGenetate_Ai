import React, { useState, useRef } from "react";
import Title from "../Title";
import SelectInput from "@/components/Home_Components/SelectInput";
import CommonButton from "../CommonButton";
import { FaFileVideo } from "react-icons/fa6";
import VideoEditorInterface from "./VideoEditorInterface";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";
import { useForm, FormProvider } from "react-hook-form";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const VideoGeneratorForm = () => {
  const AxiosSecure = useAxiosSecure();

  // Will store video_id after POST
  const [videoId, setVideoId] = useState(null);

  // Scroll reference
  const videoSectionRef = useRef(null);

  // RHF setup
  const methods = useForm({
    defaultValues: {
      title: "",
      prompt: "",
      category_id: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  // 🔥 POST: Generate Video
  const VideoGenMutation = useMutation({
    mutationFn: async (data) => {
      const response = await AxiosSecure.post("/generate/", data);
      return response?.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Generating your video...");
      return { toastId };
    },
    onSuccess: (response, _variables, context) => {
      updateToastSuccess(context.toastId, response?.message);

      // Save video ID for polling
      setVideoId(response?.video_id);

      // Scroll to the bottom where video will appear
      setTimeout(() => {
        videoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    },
    onError: (error, _variables, context) => {
      const message =
        error.response?.data?.message || "Something went wrong!";
      updateToastError(context.toastId, message);
    },
  });

  // Submit
  const onSubmit = (data) => {
    if (!data.category_id) {
      return updateToastError(null, "Please select a category first!");
    }
    VideoGenMutation.mutate(data);
  };

  // 🔥 GET: Poll video status every 3s until completed
  const GetVideoQuery = useQuery({
    queryKey: ["video-status", videoId],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/status/${videoId}/`);
      return res.data;
    },
    enabled: !!videoId, // Start only when videoId exists
    refetchInterval: (data) =>
      data?.status === "completed" ? false : 3000, // Auto-stop when done
  });

  return (
    <div>
      <div className="border border-Primary/30 bg-Primary/10 p-6 md:p-8 rounded-2xl">
        <Title level="title32" className="text-white text-center mb-6">
          Convert Your Ideas Into AI Videos
        </Title>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

            {/* Category Selector */}
            <div>
              <Title level="title20" className="text-white mb-2">
                Select video type
              </Title>
              <SelectInput />
              {errors.category_id && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.category_id.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <Title level="title20" className="text-white mb-2">
                Title
              </Title>
              <input
                type="text"
                placeholder="Enter a title..."
                className="w-full p-3 bg-transparent text-white border border-Primary/30 rounded-lg outline-none placeholder:text-white/60"
                {...methods.register("title", {
                  required: "Please enter a title",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                })}
              />
              {errors.title && (
                <p className="text-red-400 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Prompt */}
            <div>
              <Title level="title20" className="text-white mb-2">
                Describe your idea
              </Title>
              <textarea
                placeholder="Describe your video idea..."
                rows={4}
                className="w-full p-3 bg-transparent text-white border border-Primary/30 rounded-lg outline-none placeholder:text-white/60 resize-none"
                {...methods.register("prompt", {
                  required: "Please enter your idea",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 characters required",
                  },
                })}
              />
              {errors.prompt && (
                <p className="text-red-400 text-sm">{errors.prompt.message}</p>
              )}
            </div>

            {/* Submit */}
            <CommonButton
              type="submit"
              variant="secondary"
              disabled={VideoGenMutation.isPending}
              className="mt-4 rounded-full mx-auto flex items-center gap-2"
            >
              {VideoGenMutation.isPending ? "Generating..." : "Generate Now"}
              <FaFileVideo />
            </CommonButton>
          </form>
        </FormProvider>
      </div>

      {/* 🔥 Video Output Section */}
      <div ref={videoSectionRef} className="mt-10">
        {!videoId ? (
          <p className="text-center text-gray-400">
            Your generated video will appear here...
          </p>
        ) : GetVideoQuery.isLoading ||
          GetVideoQuery.data?.status !== "completed" ? (
          <div className="text-center text-white py-10 h-screen flex flex-col items-center justify-center gap-4">
            <p className="text-xl animate-pulse">⏳ Your video is processing...</p>
            <p className="text-sm opacity-70">This may take some time</p>
          </div>
        ) : (
          <VideoEditorInterface videoData={GetVideoQuery.data} />
        )}
      </div>
    </div>
  );
};

export default VideoGeneratorForm;
