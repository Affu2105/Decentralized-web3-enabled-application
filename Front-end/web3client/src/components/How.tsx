import React from "react";

interface StepProps {
  number: string;
  title: string;
  description: string;
  image: string;
}

const PlatformWorkflow = () => {
  const steps: StepProps[] = [
    {
      number: "01",
      title: "Connect Your Wallet",
      description: "Connect your Web3 wallet (e.g., MetaMask) to get started with submitting your complaints anonymously on our platform.",
      image: "https://media.istockphoto.com/id/1358389594/photo/futuristic-play-to-earn-concept.jpg?s=612x612&w=0&k=20&c=6dnf0yGSyJX3j3iiVnU6qu55mJvYPVK8NCtOTpJtx34=",
    },
    {
      number: "02",
      title: "Submit Your Complaint",
      description: "You can submit your complaint securely, ensuring your identity remains anonymous throughout the process.",
      image: "https://media.istockphoto.com/id/1473166921/photo/nft-in-neon-cloud-non-fungible-token-nft-technology-concept-nft-inscription-on-a.jpg?s=612x612&w=0&k=20&c=1IxYqG5NxOhy-lX_pB59dBYqeQ4JrTm3wiGSru2lxXM=",
    },
    {
      number: "03",
      title: "Rate-Limiting Feature",
      description: "Please note that complaints can only be submitted once every 6 hours to prevent abuse and ensure fairness.",
      image: "https://media.istockphoto.com/id/1401980646/photo/3d-rendered-classic-sculpture-metaverse-avatar-with-network-of-low-poly-glowing-purple-lines.jpg?s=612x612&w=0&k=20&c=SyPEypDcGl9021jj7pP0GW3T_Y7FNa_0yEt9KAak4Gk=",
    },
    {
      number: "04",
      title: "Monitor Your Complaint",
      description: "Track the status of your complaint as it progresses through the system, ensuring transparency and accountability.",
      image: "https://media.istockphoto.com/id/1401980646/photo/3d-rendered-classic-sculpture-metaverse-avatar-with-network-of-low-poly-glowing-purple-lines.jpg?s=612x612&w=0&k=20&c=SyPEypDcGl9021jj7pP0GW3T_Y7FNa_0yEt9KAak4Gk=",
    },
  ];
  
  
    return (
      <section className="py-20" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
            Creating your decentralized skill portfolio is easy with these simple steps
          </p>
  
          <div className="mt-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center mb-20 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                } relative`}
              >
                <div className="flex-1 p-8">
                  <div className="text-6xl font-extrabold text-purple-100 mb-4">{step.number}</div>
                  <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed max-w-lg">{step.description}</p>
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    width={300}
                    height={300}
                    className="rounded-lg shadow-lg"
                  />
                </div>
  
                {index < steps.length - 1 && (
                  <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-purple-600 to-transparent hidden md:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default PlatformWorkflow;