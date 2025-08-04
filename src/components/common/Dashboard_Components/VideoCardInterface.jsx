import React from 'react';
import { Edit3, Download, Trash2, Play } from 'lucide-react';

export default function VideoCardInterface() {
  return (
    <div className="">
      <div className=" bg-Primary/10 text-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Video Thumbnail Section */}
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-gray-100">

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-t-2xl"></div>
          
          {/* Time indicator */}
          <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
            00:30
          </div>
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
              <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6">
          {/* Title and Date */}
          <div className="mb-6">
            <h3 className=" text-lg font-semibold mb-1">
              Boost Your Brand
            </h3>
            <p className=" text-sm">
              Oct 15, 2023, 10:30 PM
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3">
            {/* <button className="flex-1 flex items-center justify-center space-x-2 bg-transparent border border-yellow-500 text-yellow-600 hover:bg-yellow-50 px-4 py-2.5 rounded-lg transition-colors">
              <Edit3 className="w-4 h-4" />
              <span className="text-sm font-medium">Edit</span>
            </button> */}
            
            <button className="flex-1 flex items-center justify-center space-x-2 bg-transparent border border-yellow-500 text-yellow-600 hover:bg-yellow-50 px-4 py-2.5 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Download</span>
            </button>
            
            <button className="flex items-center justify-center bg-transparent border border-gray-300 text-white hover:text-red-600 hover:bg-gray-50 px-3 py-2.5 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}