import React, { useState, useEffect, useRef } from "react";
import CommonButton from "../common/CommonButton";
import { FaPlus } from "react-icons/fa6";
import VideoCardInterface from "../common/Dashboard_Components/VideoCardInterface";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import SearchInput from "./SearchInput";
import VideoCardSkeleton from "../common/Dashboard_Components/VideoCardSkeleton";

const MyProjects = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef(null);

  const AxiosSecure = useAxiosSecure();
  const [playingId, setPlayingId] = useState(null);

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

  // 🔥 Debounce search input (500ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);
  }, [searchValue]);

  // 🔥 Fetch all generated videos
  const { data: ListVideo, isLoading } = useQuery({
    queryKey: ["listVideo", debouncedSearch],
    queryFn: async () => {
      const res = await AxiosSecure.get("/video-list/", {
        params: { search: debouncedSearch }, // ✅ FIXED SEARCH KEY
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

        {/* Search */}
        <div className="w-full max-w-md">
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholders={placeholders}
          />
        </div>

        {/* New Video Button */}
        <CommonButton
          link="/dashboard"
          variant="secondary"
          className="items-center gap-2 border hidden md:flex border-Primary bg-Primary/10 text-white hover:text-black"
        >
          Create New Video <FaPlus />
        </CommonButton>

      </div>

      {/* Video List Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <VideoCardSkeleton key={index} />
          ))
        ) : ListVideo?.videos?.length ? (
          ListVideo.videos.map((video) => (
            <VideoCardInterface
              key={video.id}
              project={video}
              isPlaying={playingId === video.id}
              onPlay={() => setPlayingId(video.id)}
              onStop={() => setPlayingId(null)}
            />
          ))
        ) : (
          <div className="col-span-full text-center p-10 flex flex-col items-center justify-center bg-Primary/10 rounded-2xl border border-Primary/30">
            <p className="text-white text-lg mb-4">
              No videos found matching your search.
            </p>

            <CommonButton
              link="/dashboard"
              variant="secondary"
              className="mx-auto flex items-center gap-2"
            >
              Create a Video
            </CommonButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;
