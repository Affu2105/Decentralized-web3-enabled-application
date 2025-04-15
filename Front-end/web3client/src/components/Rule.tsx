import React, { useState } from "react";
import { ChevronDown, Shield, CheckCircle, AlertTriangle } from "lucide-react";

const rules = [
  {
    icon: <Shield className="h-6 w-6 text-blue-500" />,
    title: "Respect Anonymity & Privacy",
    description: "Your identity is yours to control. Protect your privacy, and respect the anonymity of others.",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    title: "Maintain Decentralized Integrity",
    description: "The integrity of the network is crucial. Ensure your actions uphold security and prevent tampering with data.",
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
    title: "Engage Ethically & Respectfully",
    description: "This platform is for constructive dialogue. Respect others, and refrain from harassment, abuse, or offensive content.",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    title: "Fair Participation",
    description: "Each user has one voice. Please follow fair voting practices and avoid manipulation or fraudulent activities.",
  },
  {
    icon: <Shield className="h-6 w-6 text-blue-500" />,
    title: "Transparency in Actions",
    description: "All your actions are recorded on the blockchain. Always review and verify your actions before confirming them.",
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
    title: "Respect the Platform’s Integrity",
    description: "Interfering with the platform’s smart contracts or governance protocols is prohibited. Let’s keep the system safe for everyone.",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    title: "Community Governance",
    description: "This platform is governed by you, the community. Participate respectfully in decision-making, as every voice matters.",
  },
  {
    icon: <Shield className="h-6 w-6 text-blue-500" />,
    title: "Liability & Acceptance",
    description: "By using this platform, you agree to all rules and regulations. The developers are not liable for any issues arising from non-compliance. Please read our Privacy Policy and Terms of Service for more details.",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-red-800" />,
    title: "Report Issues & Concerns",
    description: "If you notice bugs, security issues, or inappropriate content, report them promptly through the platform's channels to maintain a safe and secure environment.",
  },
];


const RulesGuidelines = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleRule = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 sm:px-12 bg-gradient-to-b from-[#0A0A0A] to-[#161616] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Rules & Guidelines
        </h2>
        <p className="text-gray-400 mb-10 text-lg">
          Follow these rules to maintain a safe and ethical platform experience.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {rules.map((rule, index) => (
          <div
            key={index}
            className={`relative bg-[#1A1A1A] shadow-lg rounded-xl transition-all overflow-hidden border border-[#2A2A2A] ${
              openIndex === index ? "pb-4" : ""
            }`}
          >
            <button
              className="w-full flex items-center justify-between px-6 py-4 transition-all focus:outline-none hover:bg-[#222222] rounded-t-xl"
              onClick={() => toggleRule(index)}
            >
              <div className="flex items-center gap-3">
                {rule.icon}
                <h3 className="text-lg font-semibold">{rule.title}</h3>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`px-6 text-gray-300 text-sm transition-all duration-300 ${
                openIndex === index ? "max-h-40 opacity-100 py-3" : "max-h-0 opacity-0"
              }`}
            >
              {rule.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RulesGuidelines;
