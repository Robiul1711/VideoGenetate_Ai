
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import UserDropdown from "@/shared/UserDropdown";

const CommonNavbar = ({ open, setOpen }) => {
  const {user,setUser}=useAuth();
  const navigate = useNavigate();


const handleLogout = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You will be logged out!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout!',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      toast.success("Logout successful");
      setUser(null);
      navigate("/auth/sign-in");
    }
  });
};
  const handleSettings = () => {

    navigate("/dashboard");
  }
  // console.log(user);
  return (
    <div className="flex items-center gap-5 justify-between w-full py-3 md:py-6 px-6  rounded-2xl">
      <div className="flex items-center gap-4">
        <span
          onClick={() => setOpen(!open)}
          className="xlg:hidden block cursor-pointer"
        >
          <GiHamburgerMenu color="black" size={26} />
        </span>
        <div className="">
          <p className="  text-lg md:text-3xl font-bold">Welcome back, Ekramul</p>
        </div>
      </div>

      <div className="flex items-start md:gap-4 gap-2">
         
              <UserDropdown
                user={user}
                onLogout={handleLogout}
                onSettings={handleSettings}
              />
        
      </div>
    </div>
  );
};

export default CommonNavbar;
