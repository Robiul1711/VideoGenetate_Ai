import React from "react";

export default function VideoCardSkeleton() {
  return (
    <div className="bg-Primary/10 text-white rounded-2xl overflow-hidden shadow-2xl animate-pulse">
      {/* Video Thumbnail Skeleton */}
      <div className="h-48 bg-gray-700 rounded-t-2xl" />

      {/* Content Section Skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-600 rounded w-3/4"></div> {/* Title */}
        <div className="h-4 bg-gray-600 rounded w-1/2"></div> {/* Date */}
        <div className="flex space-x-3 mt-4">
          <div className="flex-1 h-10 bg-gray-600 rounded-lg"></div> {/* Download */}
          <div className="w-10 h-10 bg-gray-600 rounded-lg"></div> {/* Delete */}
        </div>
      </div>
    </div>
  );
}
