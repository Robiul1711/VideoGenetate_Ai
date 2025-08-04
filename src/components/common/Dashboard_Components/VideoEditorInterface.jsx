import React from 'react';
import { Play, Download, Share2, Save, RotateCcw, Edit3 } from 'lucide-react';

export default function VideoEditorInterface() {
  return (
    <div className="mt-10">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          
          {/* Video Preview Section */}
          <div className="lg:col-span-2 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden relative">
            {/* Video Preview */}
            <div className="relative h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              {/* Simulated video editing interface */}
              <div className="absolute inset-4 bg-black/50 rounded-lg overflow-hidden">
                <div className="h-full bg-gradient-to-br from-cyan-500 to-blue-600 relative">
                  {/* Video content simulation */}
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Central figure/character */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-48 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg opacity-80"></div>
                  </div>
                  
                  {/* Video editing timeline at bottom */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 rounded-lg p-2">
                      <div className="flex space-x-1 mb-2">
                        <div className="flex-1 h-8 bg-orange-500 rounded"></div>
                        <div className="flex-1 h-8 bg-red-500 rounded"></div>
                        <div className="flex-1 h-8 bg-purple-500 rounded"></div>
                        <div className="flex-1 h-8 bg-blue-500 rounded"></div>
                      </div>
                      <div className="h-1 bg-white/20 rounded-full">
                        <div className="h-full w-1/3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl">
                  <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Details Panel */}
          <div className="bg-Primary/5 border border-Primary/30 backdrop-blur-sm rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-semibold">Video Details</h2>
              <Edit3 className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
            
            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              A cinematic drone shot of a coastal city at sunset, with waves crashing against the 
              shore and city lights beginning to turn on.
            </p>
            
            {/* Video Properties */}
            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Style</span>
                <span className="text-white text-sm font-medium">Funny Video</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Duration</span>
                <span className="text-white text-sm font-medium">15 seconds</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Resolution</span>
                <span className="text-white text-sm font-medium">1080p</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <button className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105">
                <Download className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <span className="text-white text-sm font-medium">Download</span>
              </button>
              
              <button className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105">
                <Share2 className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <span className="text-white text-sm font-medium">Share</span>
              </button>
              
              <button className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105">
                <Save className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <span className="text-white text-sm font-medium">Save</span>
              </button>
            </div>
            
            {/* Generate Another Button */}
            <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2">
              <span>Generate Another Now</span>
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}