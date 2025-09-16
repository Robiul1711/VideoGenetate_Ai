import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const About = () => {
    const axiosPublic = useAxiosPublic();
const { data, isLoading } = useQuery({
  queryKey: ["home"],
  queryFn: async () => {
    const res = await axiosPublic.get("cms/");
    return res.data; // return only the data part
  },
});

const AllData= data?.data || [];
  return (
    <div className="section-padding-x py-12 max-w-6xl mx-auto">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-Primary mb-4">{AllData?.about_section?.title}</h1>
        <p className="text-gray-400 text-lg">
          {AllData?.about_section?.subtitle}
        </p>
      </header>


 


      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-Primary mb-4">
          {AllData?.about_section?.what_is_header}
        </h2>
        <p className="text-gray-300 leading-relaxed">
          {AllData?.about_section?.what_is_content}
        </p>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-Primary mb-4">Features</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {/* <li>Generate videos instantly from text input or scripts.</li> */}
          {
            AllData?.about_section?.features?.map((feature) => (
              <li key={feature.id}>{feature.name}</li>
            ))
          }

        </ul>
      </section>

      {/* Mission Section */}
      <section>
        <h2 className="text-2xl font-semibold text-Primary mb-4">
        {AllData?.about_section?.mission_header}
        </h2>
        <p className="text-gray-300 leading-relaxed">
        {AllData?.about_section?.mission_content}
        </p>
      </section>
    </div>
  );
};

export default About;
