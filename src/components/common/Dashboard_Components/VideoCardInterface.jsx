import React, { useState } from "react";
import { Download, Trash2, Play, X, Edit3 } from "lucide-react";
import dayjs from "dayjs";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";

export default function VideoCardInterface({
  project,
  isPlaying,
  onPlay,
  onStop,
}) {
  const VID_BASE_URL = import.meta.env.VITE_IMG_URL || "";
  const AxiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(project?.title || "");

  // -------- DELETE --------
  const DeleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await AxiosSecure.delete(`/video/${id}/delete/`);
      return res.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Deleting video...");
      return { toastId };
    },
    onSuccess: (response, _variables, context) => {
      updateToastSuccess(context.toastId, response?.message);
      queryClient.invalidateQueries({ queryKey: ["listVideo"] });
    },
    onError: (error, _variables, context) => {
      updateToastError(
        context.toastId,
        error.response?.data?.message || "Something went wrong!"
      );
    },
  });

  // -------- EDIT TITLE --------
  const EditMutation = useMutation({
    mutationFn: async ({ id, title }) => {
      const res = await AxiosSecure.put(`/video/${id}/edit/`, { title });
      return res.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Updating title...");
      return { toastId };
    },
    onSuccess: (response, _variables, context) => {
      updateToastSuccess(context.toastId, response?.message || "Updated!");
      queryClient.invalidateQueries({ queryKey: ["listVideo"] });
      setIsEditing(false);
    },
    onError: (error, _variables, context) => {
      updateToastError(
        context.toastId,
        error.response?.data?.message || "Update failed!"
      );
    },
  });

  const formattedDate = project?.created_at
    ? dayjs(project.created_at).format("DD MMM YYYY, hh:mm A")
    : "";

  const formattedDuration =
    project?.duration && project.duration > 0
      ? `${project.duration}s`
      : `${project.category}`;

  return (
    <div className="bg-Primary/10 text-white rounded-2xl overflow-hidden shadow-2xl">

      {/* ------------ VIDEO PREVIEW / PLAYER ------------ */}
      <div className="relative h-48">

        {/* If playing → show full video player */}
        {isPlaying ? (
          <video
            src={VID_BASE_URL + project?.video_file}
            className="w-full h-full object-cover"
            controls
            autoPlay
          />
        ) : (
          <>
            {/* REAL VIDEO PREVIEW */}
            <video
              src={VID_BASE_URL + project?.video_file}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
            />

            {/* 🔥 PLAY BUTTON (centered overlay) */}
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={onPlay}
            >
              <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition">
                <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
              </div>
            </div>

            {/* duration label */}
            <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {formattedDuration}
            </div>
          </>
        )}

        {/* X Close Button when playing */}
        {isPlaying && (
          <div
            className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/80 transition"
            onClick={onStop}
          >
            <X className="w-4 h-4 text-white" />
          </div>
        )}

      </div>

      {/* ------------ CONTENT ------------ */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-1 line-clamp-1">
            {project?.title}
          </h3>
          <p className="text-sm">{formattedDate}</p>
        </div>

        <div className="flex space-x-2">
          <a
            href={VID_BASE_URL + project?.video_file}
            download={`${project.title}.mp4`}
            className="flex-1 flex items-center justify-center bg-transparent border border-yellow-500 text-yellow-600 hover:bg-yellow-50 px-3 py-2 rounded-lg"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm ml-1">Download</span>
          </a>

          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 flex items-center justify-center bg-transparent border border-yellow-500 text-yellow-600 hover:bg-yellow-50 px-3 py-2 rounded-lg"
          >
            <Edit3 className="w-4 h-4" />
            <span className="text-sm ml-1">Edit</span>
          </button>

          <button
            onClick={() => DeleteMutation.mutate(project.id)}
            className="w-10 flex items-center justify-center bg-transparent border border-gray-300 text-white hover:text-red-600 hover:bg-gray-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ------------ EDIT MODAL ------------ */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-black/80 border border-Primary p-6 rounded-xl w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">Edit Title</h2>

            <input
              type="text"
              className="w-full p-3 bg-black/20 border border-yellow-500 text-white rounded-lg outline-none"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                className="px-4 py-2 bg-gray-700 rounded-lg"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-yellow-500 text-black rounded-lg"
                onClick={() =>
                  EditMutation.mutate({ id: project.id, title: editTitle })
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
