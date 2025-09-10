import React from "react";
import Title from "../common/Title";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoBrushOutline } from "react-icons/io5";
import { PiVideoCameraBold } from "react-icons/pi";
import { HiOutlineShare } from "react-icons/hi";
const data = [
  {
    id: 1,
    title: "Write Your Story",
    description: "Submit any short idea or memory (4-5 lines only).",
    icon: (
      <IoDocumentTextOutline className="text-5xl text-Primary p-2 bg-Primary/10 rounded-full" />
    ),
  },
  {
    id: 2,
    title: "AI-Powered Creativity",
    description: "Our AI analyses the text and crafts an engaging video.",
    icon: (
      <IoBrushOutline className="text-5xl text-Primary p-2 bg-Primary/10 rounded-full" />
    ),
  },
  {
    id: 3,
    title: "Auto Video Generation",
    description: "Get short videos with visuals, music, and flow.",
    icon: (
      <PiVideoCameraBold className="text-5xl text-Primary p-2 bg-Primary/10 rounded-full" />
    ),
  },
  {
    id: 4,
    title: "Download or Share",
    description: "Instantly download or share your video with one click.",
    icon: (
      <HiOutlineShare className="text-5xl text-Primary p-2 bg-Primary/10 rounded-full" />
    ),
  },
];
const PowerfulFeatures = () => {
  return (
    <div className="section-padding-x py-14">
      <Title level="title40" className="text-center text-Primary mb-6">
        Powerful Features
      </Title>
      <Title level="title20" className="text-center text-white">
        Our AI-powered platform makes video creation effortless and accessible
        to everyone.
      </Title>
<div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {data.map((item) => (
    <div
      key={item.id}
      className="border border-Primary/30 bg-Primary/10 p-6 rounded-2xl transition-transform transform hover:scale-105 hover:shadow-lg hover:border-Primary/50"
    >
      <div>{item.icon}</div>
      <div className="mt-6">
        <Title level="title24" className="text-white mb-2">
          {item.title}
        </Title>
        <p className="text-white text-base font-medium leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default PowerfulFeatures;
