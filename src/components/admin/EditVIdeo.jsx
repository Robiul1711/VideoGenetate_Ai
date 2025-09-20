import React, { useState, useEffect, useRef } from "react";
import { FaFileVideo } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";
import { useForm, FormProvider } from "react-hook-form";
import useAxiosSecure from "@/hooks/useAxiosSecure";

import SelectInput from "../Home_Components/SelectInput";
import CommonButton from "../common/CommonButton";
import VideoEditorInterface from "../common/Dashboard_Components/VideoEditorInterface";
import Title from "../common/Title";
import { useParams } from "react-router-dom";

const EditVideo = () => {
  const AxiosSecure = useAxiosSecure();
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const { id } = useParams();
const videoSectionRef=useRef(null)
  // Fetch video details
  const { data, isLoading } = useQuery({
    queryKey: ["videoDetails", id],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/video-generator/projects/${id}/`);
      return res.data;
    },
  });

  // React Hook Form setup
  const methods = useForm({
    defaultValues: {
      title: "",
      prompt: "",
      video_type: "",
    },
  });

  const { handleSubmit, formState: { errors }, reset } = methods;

  // ✅ Reset form when data is fetched
  useEffect(() => {
    if (data?.data) {
      reset({
        title: data.data.title || "",
        prompt: data.data.prompt || "",
        video_type: data.data.video_type || "",
      });
    }
  }, [data, reset]);

  // Mutation
  const EditVideoGenMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await AxiosSecure.put(`/video-generator/projects/${id}/`, formData);
      return response?.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Updating...");
      return { toastId };
    },
    onSuccess: (response, _variables, context) => {
      updateToastSuccess(context.toastId, response?.message || "Video updated successfully");
      setGeneratedVideo(response);
           // ✅ Smooth scroll to VideoEditorInterface
      setTimeout(() => {
        videoSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

    },
    onError: (error, _variables, context) => {
      const errorMessage = error.response?.data?.message || "Something went wrong, try again later!!";
      updateToastError(context.toastId, errorMessage);
    },
  });

  // Submit handler
  const onSubmit = (formData) => {
    if (!formData.video_type) {
      return updateToastError(null, "Please select a video type first!");
    }
    EditVideoGenMutation.mutate(formData);
  };

  if (isLoading) {
    return <p className="text-center text-gray-400">Loading video details...</p>;
  }

  return (
    <div className="p-4 md:p-8 space-y-10">
      <div className="border border-Primary/30 bg-Primary/10 p-6 md:p-8 rounded-2xl">
        <Title level="title32" className="text-white text-center mb-6">
          Edit Video For better Results
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
              disabled={EditVideoGenMutation.isPending}
              className="mt-4 rounded-full flex items-center gap-2 mx-auto"
            >
              {EditVideoGenMutation.isPending ? "Updating..." : "Update Now"}
              <FaFileVideo />
            </CommonButton>
          </form>
        </FormProvider>
      </div>

      {/* Video Editor */}
      <div ref={videoSectionRef}>
        <VideoEditorInterface videoData={generatedVideo || data} />
      </div>
    </div>
  );
};

export default EditVideo;
