import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react"; 
import { sepolia } from "thirdweb/chains";
import { COMPLAINTBOX } from "../Constants/Contract";
import { getContract } from "thirdweb";
import { client } from "../client";
import { useActiveAccount } from "thirdweb/react";
import { useNavigate } from "react-router-dom";

const LoaderSpinner = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);


const ComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const account = useActiveAccount();
  const navigate = useNavigate();

  const contract = getContract({
    client,
    chain: sepolia,
    address: COMPLAINTBOX,
  });

  const { mutate: sendTransaction, isPending } = useSendTransaction(); 

  const handleSubmit = async () => { 
    if (!title || !content) {
      toast.error("Please fill in both the title and description.");
      return;
    }

    if (!account) {
      toast.error("Please connect your wallet before submitting.");
      return;
    }

    try {
      const transaction = await prepareContractCall({ 
        contract,
        method: "function postComplaint(string _title, string _description)",
        params: [title, content],
      
      });

      console.log("Prepared Transaction:", transaction);

      sendTransaction(transaction, {
        onSuccess: (result) => { 
          console.log("Transaction successful:", result);
          toast.success("Complaint posted successfully!");
          setTitle("");
          setContent(""); 
          
          setTimeout(() => {
            navigate("/TopComplaints");
          }, 1500);
        },
        onError: (error) => {
          if (error.message.includes("rejected")) {
             toast.error("Transaction rejected by user.");
          } else {
            toast.error("Transaction failed. See console for details.");
          }
          console.error("Transaction error:", error);
        },
        // onSettled is called after onSuccess or onError
        // onSettled: () => {
        //   console.log("Transaction attempt finished.");
        // }
      });

    } catch (error) {
      console.error("Error preparing transaction:", error);
      toast.error("Could not prepare transaction. See console for details.");
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    e.target.style.height = "auto"; 
    e.target.style.height = `${Math.max(e.target.scrollHeight, 40)}px`;
  };


  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-20 px-4"> {/* Adjust pt for navbar space */}
       <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
         File a Complaint
      </h1>

      <div className="relative mb-6 w-full max-w-2xl">
        <input
          type="text"
          id="complaint-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-xl sm:text-2xl font-semibold focus:outline-none border-b border-gray-700 pb-2 transition-colors duration-300 placeholder-gray-500 focus:border-purple-500"
          placeholder="Complaint Title"
           disabled={isPending} 
        />
      </div>

      <div className="relative w-full max-w-2xl mb-8">

        <textarea
           id="complaint-content"
          value={content}
          onChange={handleContentChange}
          className="w-full bg-transparent text-base sm:text-lg focus:outline-none border-b border-gray-700 pt-2 pb-2 transition-colors duration-300 placeholder-gray-400 overflow-hidden resize-none focus:border-purple-500"
          placeholder="Describe your complaint in detail..."
          rows={3} 
          style={{ minHeight: "60px" }} 
           disabled={isPending}
        />
      </div>

      <motion.button
        whileHover={{ scale: isPending ? 1 : 1.03 }} 
        whileTap={{ scale: isPending ? 1 : 0.98 }}  
        onClick={handleSubmit}
         disabled={isPending || !account} 
        className={`mt-4 w-full max-w-2xl py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transition-all duration-300 flex items-center justify-center
                   ${isPending ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-purple-400/50'}
                   ${!account && !isPending ? 'opacity-50 cursor-not-allowed bg-gradient-to-r from-gray-600 to-gray-700' : ''} // Style for disconnected wallet
                  `}
      >
        {isPending ? (
          <>
            <LoaderSpinner className="w-5 h-5 mr-3" />
            Processing...
          </>
        ) : (
          "Submit Complaint"
        )}
      </motion.button>
       {!account && <p className="text-sm text-yellow-500 mt-3">Please connect your wallet to submit.</p>}
    </div>
  );
};

export default ComplaintForm;