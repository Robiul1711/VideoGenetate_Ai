import useAxiosPublic from "@/hooks/useAxiosPublic";
import Title from "../common/Title";
import { MdOutlineDone } from "react-icons/md";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const PlanPricing = ({ Plans }) => {
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const CheckoutMutation = useMutation({
    mutationFn: async (data) => {
      // console.log(data)
      const response = await axiosSecure.post(`checkout/${data.plan_id}/`, data);
      return response?.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Checking out...");
      return { toastId };
    },
    onSuccess: (response, _variables, context) => {
      updateToastSuccess(
        context.toastId,
        response?.message || "Checkout successful"
      );
      console.log(response)
      // ✅ Open in a new tab instead of redirecting
      window.open(response?.data, "_blank");
    },
    onError: (error, _variables, context) => {
      console.log(error?.response?.data);
      const errorMessage =
        error?.response?.data?.message ||
        "Something went wrong, try again later!!";
      updateToastError(context.toastId, errorMessage);
    },
  });



// ...

const handleCheckout = (plan) => {
  if (!user) {
    Swal.fire({
      icon: "info",
      title: "Login Required",
      text: "To purchase any plan, you must be logged in first. Please login to continue.",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Login",
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to login page
        window.location.href = "/auth/sign-in"; // or use React Router navigate
      }
      // If cancelled, do nothing
    });
    return;
  }
// console.log(plan.id)
  CheckoutMutation.mutate({ plan_id: plan.id });
};



  return (
    <div className="max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-10">
        <Title text="Choose Your Plan" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
    {Plans?.data?.map((plan, index) => (
  <a
    key={index}
    target="_blank"
    rel="noopener noreferrer"
    className="flex cursor-pointer flex-col justify-between h-full bg-black rounded-xl p-6 border border-gray-700 hover:border-Primary transition"
  >
    <div>
      {/* Image */}
      <div className="w-full h-40 rounded-lg overflow-hidden">
        <img
          src={VITE_IMG_URL + plan.image}
          alt={plan.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Plan Name */}
      <h3 className="text-2xl text-white font-semibold mt-4">{plan.name}</h3>

      {/* Price */}
      <div className="mt-4 flex items-end gap-2">
        <h3 className="text-5xl text-Primary font-extrabold">
          ${plan.price}
        </h3>
        <span className="text-sm text-gray-400 mb-1">/month</span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mt-3 leading-relaxed">
        {plan.description}
      </p>

      {/* Number of Videos */}
      <p className="mt-4 text-white flex items-center gap-2 text-sm">
        <MdOutlineDone className="text-Primary text-xl" />
        {plan.number_of_video} Videos Included
      </p>

      {/* Features if available */}
      {plan.features?.length > 0 && (
        <div className="flex flex-col gap-3 mt-4">
          {plan.features.map((feature) => (
            <p
              key={feature.id}
              className="text-white text-sm flex items-center gap-2"
            >
              <MdOutlineDone className="text-Primary text-xl" />
              {feature.title}
            </p>
          ))}
        </div>
      )}

      {/* Button */}
      <button
        type="button"
        onClick={() => handleCheckout(plan)}
        disabled={user?.data?.subscription_plan_id === plan.id}
        className={`mt-6 px-6 w-full rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2 py-2 text-sm
          ${
            user?.data?.subscription_plan_id === plan.id
              ? "bg-green-600 text-white border-green-600 cursor-not-allowed"
              : "border border-Primary bg-Primary text-black hover:bg-Primary/90"
          }`}
      >
        {user?.data?.subscription_plan_id === plan.id
          ? "Current Plan"
          : "Unlock This Plan"}
      </button>
    </div>
  </a>
))}

      </div>
    </div>
  );
};

export default PlanPricing;
