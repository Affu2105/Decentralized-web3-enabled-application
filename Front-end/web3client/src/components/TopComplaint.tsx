import { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaUserSecret, FaTimes } from "react-icons/fa";
import { client } from "../client";
import { sepolia } from "thirdweb/chains";
import { COMPLAINTBOX } from "../Constants/Contract";
import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import toast from "react-hot-toast";

const TopComplaints = () => {
  const account = useActiveAccount();

  const contract = getContract({
    client,
    chain: sepolia,
    address: COMPLAINTBOX,
  });

  const { data: complaints1, isPending } = useReadContract({
    contract,
    method:
      "function getAllComplaints() view returns ((address owner, uint256 timestamp, uint256 upvotes, uint256 downvotes, string title, string description)[])",
    params: [],
  });
// console.log(complaints1); you can see all test complaints here  if you want all which are test also so you can use omplaints1 directly no problem this is for only good user experiance 
const complaints = complaints1?.slice(0, -7);
// console.log(complaints);   
  const { mutate: sendTransaction } = useSendTransaction();
  const [errorMessage, setErrorMessage] = useState("");

  const handleVote = (index: number, type: string) => {
    if (!complaints1) return;
  
    const complaintId = BigInt(complaints1.length - index);  
  
    let methodName = "";
    if (type === "upvote") methodName = "upvote";
    if (type === "downvote") methodName = "downvote";
    if (type === "revokeVote") methodName = "revokeVote";
  
    const transaction = prepareContractCall({
      contract,
      method: `function ${methodName}(uint256 _complaintId)`,
      params: [complaintId],  
    });
  
    sendTransaction(transaction, {
      onSuccess: () => {
        setErrorMessage("");
        toast.success("Transaction successful!");
      },
      onError: (error) => {
        setErrorMessage("Error processing your vote. Please try again.");
        toast.error("Error processing your transaction: " + error.message);
      },
    });
  };
  
  return (
    <div className="flex flex-col items-center bg-[#0A0A0A] min-h-screen py-10 px-4 md:px-8 mt-14">
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-8 tracking-wide text-center">
        🚀 Top Complaints
      </h2>

      <div className="w-full max-w-4xl space-y-6">
        {isPending && <p className="text-white text-lg">Loading complaints...</p>}
        {complaints &&
          complaints.map((complaint, index) => {
            const { owner, timestamp, upvotes, downvotes, title, description } = complaint;
            const readableTimestamp = new Date(Number(timestamp) * 1000).toLocaleString();
            const maskedOwner = `****${owner.slice(-4)}`; // Show only last 4 characters of address
            const userHasVoted = upvotes > 0 || downvotes > 0;

            return (
              <div
                key={index}
                className="relative bg-[#1A1A1A] p-6 md:p-7 rounded-xl shadow-lg border border-[#2C2C2C] 
                          hover:shadow-2xl transition duration-300 transform md:hover:scale-[1.03] 
                          backdrop-blur-md bg-opacity-90"
              >
                <div className="flex justify-between items-center text-[#aaa] text-xs mb-3">
                  <span className="flex items-center space-x-2 text-[#00BFFF] font-semibold">
                    <FaUserSecret className="text-lg" />
                    <span>{maskedOwner}</span>
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="text-[#bbb] mt-2 text-base leading-relaxed">
                  {description.length > 250 ? description.substring(0, 250) + "..." : description}
                </p>

                <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full text-white bg-gradient-to-r from-gray-700 to-gray-500">
                  General
                </div>

                <div className="flex justify-between items-center mt-5">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleVote(index, "upvote")}
                      className="flex items-center text-green-400 hover:text-green-300 transition-transform duration-200 hover:scale-110"
                    >
                      <FaThumbsUp className="mr-1" />
                      {upvotes.toString()}
                    </button>
                    <button
                      onClick={() => handleVote(index, "downvote")}
                      className="flex items-center text-red-400 hover:text-red-300 transition-transform duration-200 hover:scale-110"
                    >
                      <FaThumbsDown className="mr-1" />
                      {downvotes.toString()}
                    </button>

                    {userHasVoted && (
                      <button
                        onClick={() => handleVote(index, "revokeVote")}
                        className="flex items-center text-gray-400 hover:text-gray-200 transition-transform duration-200 hover:scale-110 text-sm"
                      >
                        <FaTimes className="mr-1" />
                        Remove Vote
                      </button>
                    )}
                  </div>

                  <span className="flex items-center text-[#bbb] text-sm">
                    {readableTimestamp}
                  </span>
                </div>
              </div>
            );
          })}
      </div>

      {errorMessage && (
        <div className="mt-4 text-red-500 text-sm bg-gray-800 p-3 rounded-md">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default TopComplaints;
