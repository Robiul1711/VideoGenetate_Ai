import React from 'react';
import CommonButton from '../common/CommonButton';
import { FaPlus } from 'react-icons/fa6';
import Title from '../common/Title';
import VideoCardInterface from '../common/Dashboard_Components/VideoCardInterface';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const projects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Description of Project 1',
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Description of Project 2',
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'Description of Project 3',
  },
]
const MyProjects = () => {
    const AxiosSecure = useAxiosSecure();

  // Fetch dashboard data
  const { data: ListVideo, isLoading } = useQuery({
    queryKey: ["listVideo"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/video-generator/projects/");
      return res.data;
    },
  });
console.log(ListVideo);
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 bg-transparent text-white/80 border border-white/40 rounded-full outline-none placeholder:text-white/50"
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

      {/* Optional: Add your projects listing here */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ListVideo?.data?.map((project, index) => (
          <VideoCardInterface key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default MyProjects;

