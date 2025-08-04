
import { MdOutlineDone } from "react-icons/md";

const MonthlyPlans = [
  {
    name: "Basic",
    price: 0.99,
    features: [
      "1 Free Video per Week",
      "Basic AI Voiceover",
      "Watermarked Video",
      "Standard Resolution",
      "Limited Video Styles",
      "No Commercial Use",
    ],
    link: "https://lobfile.com/api/stripe/subscription.php?plan=basic_monthly",
  },
  {
    name: "Advanced",
    price: 4.99,
    features: [
      "Unlimited Videos per Month",
      "Full HD + 4K Resolution",
      "Early Access to New Features",
      "Advanced Story Editing Tools",
      "Multiple Language Voiceovers",
      "Dedicated Rendering Server",
    ],
    link: "https://lobfile.com/api/stripe/subscription.php?plan=advance_monthly",
  },
  {
    name: "Custom",
    price: 2.99,
    features: [
      "Up to 15 Videos per Month",
      "HD Download (1080p)",
      "5+ Voiceover Options",
      "Access to More Video Templates",
      "Custom Background Music",
      "Priority Rendering Queue",
    ],
    link: "https://lobfile.com/api/stripe/subscription.php?plan=power_monthly",
  },
];

const MyPricePlan = () => {
  return (
    <div className="">

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MonthlyPlans.map((plan, index) => (
          <a
            key={index}
            href={plan.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer flex-col justify-between h-full bg-black rounded-xl p-6 border border-gray-700 hover:border-Primary transition"
          >
            <div>
              {/* Plan Name */}
              <h3 className="text-xl text-white font-semibold">{plan.name}</h3>

              {/* Price */}
              <div className="mt-6 flex items-end gap-2">
                <h3 className="text-5xl text-Primary font-extrabold">
                  ${plan.price}
                </h3>
                <span className="text-sm text-gray-400 mb-1">/month</span>
              </div>

              {/* Button */}
              <div className="mt-6 px-6 text-black rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2 py-2 sm:px-5 sm:py-2.5 md:px-7 md:py-3 border border-Primary bg-Primary text-sm sm:text-base">
                Unlock This Plan
              </div>

              {/* Features */}
              <div className="flex flex-col gap-3 mt-5">
                {plan.features.map((feature, i) => (
                  <p
                    key={i}
                    className="text-white text-sm flex items-center gap-2"
                  >
                    <MdOutlineDone className="text-Primary text-xl" />
                    {feature}
                  </p>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MyPricePlan;
