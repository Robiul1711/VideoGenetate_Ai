import React, { useState } from 'react';
import CommonButton from '../common/CommonButton';
import { FaPlus } from 'react-icons/fa6';
import VideoCardInterface from '../common/Dashboard_Components/VideoCardInterface';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import SearchInput from './SearchInput';
import VideoCardSkeleton from '../common/Dashboard_Components/VideoCardSkeleton';

const MyProjects = () => {
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);
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
    "Turn your text into a video..."
  ];

  const AxiosSecure = useAxiosSecure();
  const [playingId, setPlayingId] = useState(null); // Only one playing video

  // Fetch dashboard data
  const { data: ListVideo, isLoading } = useQuery({
    queryKey: ["listVideo"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/video-generator/projects/", { params: { video_type: searchValue } });
      return res.data;
    },
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

        {/* Button */}
        <CommonButton
          link="/dashboard"
          variant="secondary"
          className="flex items-center gap-2 border border-Primary bg-Primary/10 text-white hover:text-black"
        >
          Create New Video <FaPlus />
        </CommonButton>
      </div>


<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {isLoading
    ? Array.from({ length: ListVideo?.data?.length || 8 }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))
    : ListVideo?.data?.map((video) => (
        <VideoCardInterface
          key={video.id}
          project={video}
          isPlaying={playingId === video.id}
          onPlay={() => setPlayingId(video.id)}
          onStop={() => setPlayingId(null)}
        />
      ))}
</div>


    </div>
  );
};

export default MyProjects;
