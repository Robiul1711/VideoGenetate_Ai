import CommonNavbar from "@/pages/admin/CommonNavbar";
import SideBar from "@/pages/admin/SideBar";

import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { Settings } from "lucide-react";
import { BiSolidCrown } from "react-icons/bi";
const AdminLayout = () => {
  const [Open, setOpen] = useState(false);

  const sideBar = [
    {
        id: 1,
        icon: <MdDashboard />,
        text: "Dashboard",
        path: "/dashboard", 
        activePaths: ["/dashboard"], 
        sublink: false,
      },
    {
        id: 1,
        icon: <FaRegFileLines className="text-xl" />,
        text: "My Projects",
        path: "/dashboard/my-projects", 
        activePaths: ["/dashboard/my-projects"], 
        sublink: false,
      },
    {
        id: 1,
        icon: <BiSolidCrown />,
        text: "My Plan",
        path: "/dashboard/my-subscription", 
        activePaths: ["/dashboard/my-subscription"], 
        sublink: false,
      },
    {
        id: 1,
        icon: <Settings />,
        text: "Setting",
        path: "/dashboard/settings", 
        activePaths: [ "/dashboard/settings",], 
        sublink: false,
      },

  ];
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);
  return (
    <>
      <ScrollRestoration />
      <div className="flex  h-screen min-h-screen w-full bg-[#000000]">
        <SideBar open={Open} setOpen={setOpen} sidebar={sideBar} />
        <div className="flex-1 bg-dark text-white flex flex-col overflow-auto custom-scrollbar">
          <div className=" flex flex-col ">
            <CommonNavbar open={Open} setOpen={setOpen} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
