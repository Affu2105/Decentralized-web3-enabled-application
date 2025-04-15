import React from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="relative py-8 overflow-hidden bg-[#0A0A0A] border-t border-gray-700">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
  
        <div className="text-center md:text-left mb-4 md:mb-0">
          <span className="text-lg font-bold text-white">
             <span className="text-[#00BFFF]">MediVoice</span>
          </span>
        </div>

        <div className="flex space-x-6">
          <Link to="/Privacy&Trust" className="font-medium text-gray-400 hover:text-white cursor-pointer">
            Privacy & Trust
          </Link>
          <Link to="/ContactUs" className="font-medium text-gray-400 hover:text-white cursor-pointer">
            Contact
          </Link>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <div className="w-8 h-8 flex items-center justify-center border border-gray-500 rounded-full hover:border-white cursor-pointer">
            <FaLinkedin className="text-gray-400 hover:text-white" />
          </div>
          <div className="w-8 h-8 flex items-center justify-center border border-gray-500 rounded-full hover:border-white cursor-pointer">
            <FaTwitter className="text-gray-400 hover:text-white" />
          </div>
          <div className="w-8 h-8 flex items-center justify-center border border-gray-500 rounded-full hover:border-white cursor-pointer">
            <FaGithub className="text-gray-400 hover:text-white" />
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-6 text-gray-500">
        © {new Date().getFullYear()} MediVoice Complaints. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
