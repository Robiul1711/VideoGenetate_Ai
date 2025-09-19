import React, { useState } from "react";
import Title from "../Title";
import SelectInput from "@/components/Home_Components/SelectInput";
import CommonButton from "../CommonButton";
import { FaFileVideo } from "react-icons/fa6";
import VideoEditorInterface from "./VideoEditorInterface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";
import { useForm, FormProvider } from "react-hook-form";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const VideoGeneratorForm = () => {
  const AxiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [generatedVideo, setGeneratedVideo] = useState(null); // ✅ store API response

  // React Hook Form setup
  const methods = useForm({
    defaultValues: {
      title: "",
      prompt: "",
      video_type: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  // Mutation
  const VideoGenMutation = useMutation({
    mutationFn: async (data) => {
      const response = await AxiosSecure.post("/video-generator/projects/", data);
      return response?.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Generating...");
      return { toastId };
    },
    onSuccess: (response, _variables, context) => {
      updateToastSuccess(
        context.toastId,
        response?.message || "Video generation successful"
      );
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });

      setGeneratedVideo(response); // ✅ store the generated video data
    },
    onError: (error, _variables, context) => {
      const errorMessage =
        error.response?.data?.message || "Something went wrong, try again later!!";
      updateToastError(context.toastId, errorMessage);
    },
  });

  // Submit handler
  const onSubmit = (data) => {
    if (!data.video_type) {
      return updateToastError(null, "Please select a video type first!");
    }
    VideoGenMutation.mutate(data);
  };

  return (
    <div>
      <div className="border border-Primary/30 bg-Primary/10 p-6 md:p-8 rounded-2xl">
        <Title level="title32" className="text-white text-center mb-6">
          Convert Your Ideas Into AI Videos
        </Title>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {/* Video type selector */}
            <div>
              <Title level="title20" className="text-white mb-2">
                Select video type
              </Title>
              <SelectInput />
              {errors.video_type && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.video_type.message || "Please select a video type"}
                </p>
              )}
            </div>

            {/* Title input */}
            <div>
              <Title level="title20" className="text-white mb-2">
                Title
              </Title>
              <input
                type="text"
                placeholder="Enter a title for your video"
                className="w-full p-3 bg-transparent text-white text-base font-medium leading-relaxed border border-Primary/30 rounded-lg outline-none placeholder:text-white/60"
                {...methods.register("title", {
                  required: "Please enter a title",
                  minLength: { value: 3, message: "Title must be at least 3 characters" },
                })}
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
              )}
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
                {...methods.register("prompt", {
                  required: "Please enter your video idea",
                  minLength: { value: 10, message: "Prompt must be at least 10 characters" },
                })}
              />
              {errors.prompt && (
                <p className="text-red-400 text-sm mt-1">{errors.prompt.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <CommonButton
              type="submit"
              variant="secondary"
              disabled={VideoGenMutation.isPending}
              className="mt-4 rounded-full flex items-center gap-2 mx-auto"
            >
              {VideoGenMutation.isPending ? "Generating..." : "Generate Now"}
              <FaFileVideo />
            </CommonButton>
          </form>
        </FormProvider>
      </div>

      {/* Video Editor */}
      <div>
        {/* ✅ pass the generated video data as props */}
        <VideoEditorInterface videoData={generatedVideo} />
      </div>
    </div>
  );
};

export default VideoGeneratorForm;
