import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "@/hooks/useAuth";
import UserDropdown from "@/shared/UserDropdown";

const CommonNavbar = ({ open, setOpen }) => {
  const { user, logout, loading } = useAuth();

  return (
    <div className="flex items-center gap-5 justify-between w-full py-3 md:py-6 px-6  rounded-2xl">
      <div className="flex items-center gap-4">
        <span
          onClick={() => setOpen(!open)}
          className="xlg:hidden block cursor-pointer"
        >
          <GiHamburgerMenu color="white" size={26} />
        </span>
        <div className="">
          <p className="  md:text-3xl font-bold">
            Welcome back, {user?.data?.name}
          </p>
        </div>
      </div>

      <div className="flex items-start md:gap-4 gap-2">
        <UserDropdown user={user} onLogout={logout} loading={loading} />
      </div>
    </div>
  );
};

export default CommonNavbar;
