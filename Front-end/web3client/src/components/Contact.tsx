import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-gray-200">
      <div className="flex-grow flex flex-col justify-center items-center px-6 py-12 sm:py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-[#00BFFF] tracking-wide animate-fadeIn">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-400 max-w-lg animate-slideUp">
          We value your feedback and inquiries. Whether you have a suggestion, a concern, or need assistance, 
          feel free to reach out to us.
        </p>

        <div className="mt-6 max-w-lg w-full bg-gray-800 p-5 sm:p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
            ⚠️ Report Issues Responsibly
          </h3>
          <p className="text-gray-300 text-sm sm:text-base">
            If you encounter <span className="font-semibold text-white">bugs, security issues, or inappropriate content</span>,  
            please report them immediately through the appropriate channels on our platform.  
            Only report urgent matters that require immediate attention.
          </p>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Contact us at <span className="text-[#00BFFF] font-semibold">support@MediVoice.com</span>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          <p>Use the platform responsibly. Made with ❤️ for a safer community.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
