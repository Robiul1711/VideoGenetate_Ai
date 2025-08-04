import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { IoLogoLinkedin } from 'react-icons/io5';
import { LogoIcon } from '@/components/common/Icons';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Pricing', path: '/pricing' },

];

const Footer = () => {
  return (
    <footer className=" text-white py-6 md:py-12 section-padding-x border-t border-white/20">
      <div className="flex flex-col items-center gap-8 md:gap-10 text-center">
        {/* Logo */}
         <Link to='/' className='flex items-center gap-2 text-2xl text-Primary font-bold'>
             <LogoIcon />Clipo.ai
           </Link>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-between items-center gap-6 text-base md:text-lg font-medium max-w-4xl w-full">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.path}
                className="hover:underline transition-all duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom Section */}
        <div className="w-full border-t border-white/20 pt-5 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-sm">
          <p className="text-center md:text-left text-[#cac4c4] text-xl"> <Link to="/terms-of-service" className="hover:underline transition-all duration-200">Terms of Service</Link> | <Link to="/privacy-policy" className="hover:underline transition-all duration-200">Privacy Policy </Link></p>
{/* 
          <div className="flex gap-8 ">
            <FaFacebook className="hover:text-gray-300 cursor-pointer text-xl" />
            <RiTwitterXFill className="hover:text-gray-300 cursor-pointer text-xl" />
            <FaYoutube className="hover:text-gray-300 cursor-pointer text-xl" />
            <FaInstagram className="hover:text-gray-300 cursor-pointer text-xl" />
            <IoLogoLinkedin className="hover:text-gray-300 cursor-pointer text-xl" />
          </div> */}

          <p className="text-center md:text-right text-[#cac4c4] text-xl">
            © {new Date().getFullYear()} Aviation Insider. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;