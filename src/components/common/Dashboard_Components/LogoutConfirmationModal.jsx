import React, { useState } from 'react';

export default function LogoutConfirmationModal() {
  const [isOpen, setIsOpen] = useState(true);

  const handleCancel = () => {
    setIsOpen(false);
    // Handle cancel logic
    console.log('Logout cancelled');
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('User logged out');
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <button
          onClick={handleOpenModal}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Show Logout Modal
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-gray-800 rounded-2xl border border-gray-600/50 p-8 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-yellow-400 text-xl font-semibold">Log out</h2>
          
          {/* Divider Line */}
          <div className="w-16 h-px bg-gray-600 mx-auto mt-4"></div>
        </div>

        {/* Confirmation Message */}
        <div className="text-center mb-6">
          <p className="text-gray-300 text-base leading-relaxed">
            Are you sure you want to log out from website?
          </p>
        </div>

        {/* Warning Note */}
        <div className="mb-8">
          <p className="text-red-400 text-sm text-center">
            <span className="font-medium">Note:</span> This action cannot be undone.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleCancel}
            className="flex-1 bg-transparent border border-yellow-400/60 text-yellow-400 hover:bg-yellow-400/10 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={handleLogout}
            className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}