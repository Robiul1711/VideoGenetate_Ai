import CommonButton from '@/components/common/CommonButton'
import { LogoIcon } from '@/components/common/Icons'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState(1);
      const tabWidth =100;
  const indicatorPosition = (activeTab - 1) * (tabWidth + 1); // +1 for small gap
  return (
    <nav className='flex items-center justify-between section-padding-x py-4'>
      <Link to='/' className='flex items-center gap-2 text-2xl text-Primary font-bold'>
        <LogoIcon />Clipo.ai
      </Link>
  <div className="flex items-center justify-center">
      <ul className="relative flex bg-[#1E1E23] rounded-full p-1">
        {/* Moving Indicator */}
        <div
          className="absolute h-[85%] w-[110px] bg-[#737e8865] flex items-center justify-center rounded-full transition-all duration-500 ease-in-out"
          style={{ left: `${indicatorPosition}px` }}
        ></div>

        {/* Tab Items */}
        {["Home", "About Us", "Pricing"].map((label, index) => {
          const tabIndex = index + 1;
          return (
            <li
              key={label}
              onClick={() => setActiveTab(tabIndex)}
              className={`relative z-10 px-6 py-3 cursor-pointer rounded-full font-semibold transition duration-300 ${
                activeTab === tabIndex
                  ? "text-Primary "
                  : " text-[#cac4c4]"
              }`}
            >
              {label}
            </li>
          );
        })}
      </ul>
    </div>
      <div>
        <CommonButton variant='secondary' className='rounded-full'>Sign In</CommonButton>
      </div>
    </nav>
  )
}

export default Navbar