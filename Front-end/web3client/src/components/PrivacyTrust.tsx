import React from "react";

const PrivacyAndTrust = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 sm:py-14 mt-14 sm:mt-16 text-gray-200">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 text-[#00BFFF] tracking-wide">
        Privacy & Trust
      </h2>
      <p className="text-base sm:text-lg leading-relaxed text-gray-300 text-center mb-6 sm:mb-8">
        At <span className="font-semibold text-white">MediVoice</span>, protecting your privacy and ensuring data security is our highest priority. We leverage decentralized technologies and cutting-edge encryption to ensure that your complaints and interactions remain completely private, transparent, and secure.
      </p>

      <div className="space-y-8 sm:space-y-10">
        <div className="p-5 sm:p-6 bg-gray-800 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
          <h3 className="text-xl font-semibold text-white mb-2">🔒 Data Protection & Anonymity</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            We utilize end-to-end encryption and decentralized identity protocols to ensure that your personal information remains anonymous. No personally identifiable information (PII) is collected or stored, ensuring complete confidentiality.
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-gray-800 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
          <h3 className="text-xl font-semibold text-white mb-2">⚖️ Ethical & Secure Platform</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Our platform ensures that complaints are processed with fairness and security in mind. All submissions are handled ethically, free from manipulation or outside influence, so your concerns are addressed without bias.
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-gray-800 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
          <h3 className="text-xl font-semibold text-white mb-2">🔍 Transparency & Immutable Records</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            By harnessing blockchain technology, all complaints and interactions are recorded immutably. Once submitted, no data can be altered or erased, ensuring a transparent and trustworthy process.
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-gray-800 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
          <h3 className="text-xl font-semibold text-white mb-2">❌ No Third-Party Data Sharing</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            We have a strict zero-data-sharing policy. Your data is not sold, shared, or distributed to third parties, advertisers, or external organizations. Your privacy is completely under your control.
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-gray-800 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
          <h3 className="text-xl font-semibold text-white mb-2">✅ User Rights & Control</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            As a decentralized platform, you have full autonomy over your interactions. No central authority can alter or censor the complaints you submit, ensuring your freedom to speak up remains intact.
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-gray-800 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
          <h3 className="text-xl font-semibold text-white mb-2">📜 Community Guidelines & Fair Usage</h3>
          <p className="text-gray-300 text-sm sm:text-base">
            We are committed to fostering a safe and respectful environment. Our strict community guidelines ensure that abusive, hateful, or misleading content is not tolerated. We encourage constructive dialogue to improve healthcare experiences for all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndTrust;
