import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdRoomPreferences, MdSecurity } from "react-icons/md";
import Security from "../common/Dashboard_Components/Security";
import PersonalInformation from "../common/Dashboard_Components/PersonalInformation";
import Preferences from "../common/Dashboard_Components/Preferences";

const tabs = [
  { id: "personal", label: "Personal Information", icon: <FaRegUser /> },
  // { id: "preferences", label: "Preferences", icon: <MdRoomPreferences /> },
  { id: "security", label: "Security", icon: <MdSecurity /> },
];

const Setting = () => {
  const [activeTab, setActiveTab] = useState("personal");
  
  const renderComponent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInformation />;
      case "preferences":
        return <Preferences />;
      case "security":
        return <Security />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="p-4 flex flex-col sm:flex-row items-center justify-between max-w-xl mx-auto w-full rounded-2xl bg-Primary/10 gap-3 sm:gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm sm:text-base font-medium ${
              activeTab === tab.id
                ? "bg-Primary text-black"
                : "text-white/80 hover:text-white"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Selected Component */}
      <div className="mt-6">{renderComponent()}</div>
    </div>
  );
};

export default Setting;
