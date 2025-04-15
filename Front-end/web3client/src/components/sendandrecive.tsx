import React, { useState, useEffect } from 'react';
import {
  useActiveAccount,
  useActiveWallet,
  useSendTransaction
} from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { client } from "../client";
import { toWei, isAddress } from "thirdweb/utils";
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import { QRCodeSVG } from 'qrcode.react'; 
const CopyIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
    </svg>
);

function SendReceiveComponent() { 
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { mutate: sendTx, isPending: isSending, isError: isSendError, isSuccess: isSendSuccess, error: sendError } = useSendTransaction();

  const [activeView, setActiveView] = useState<'send' | 'receive'>('send'); 
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [displayError, setDisplayError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false); 

  const connectedChainId = wallet?.getChain()?.id;
  const userAddress = account?.address;

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000); 
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

   useEffect(() => {
     if (activeView !== 'send') return; 

     if (isSendSuccess) {
         toast.success(`Transaction submitted successfully!`);
         setRecipient('');
         setAmount('');
         setDisplayError(null);
     }
      if (isSendError && sendError) {
        //  console.error("--- TRANSACTION ERROR (Using useSendTransaction) ---");
        //  console.error("Hook Error Object:", sendError);
        //  console.error("-----------------------------------------------------");
         const message = sendError?.message?.includes("rejected")
             ? "Transaction rejected by user."
             : `Transaction failed: ${sendError?.message || 'Unknown error'}`;
         toast.error(message);
         setDisplayError(message);
     }
     
  }, [isSendSuccess, isSendError, sendError, activeView]); 


  const handleSendEth = async () => {
    setDisplayError(null);

    if (!wallet || !account) return;

    if (connectedChainId !== sepolia.id) {
         toast.error(`Please connect to Sepolia (ID: ${sepolia.id})`);
         return;
    }

    if (!recipient || !amount) {
      toast.error("Please enter recipient address and amount.");
      return;
    }

    let amountInWei;
    try {
      if (!isAddress(recipient)) throw new Error("Invalid recipient address format.");
      amountInWei = toWei(amount);
      if (BigInt(amountInWei) <= 0) throw new Error("Amount must be > 0.");
    } catch (err: any) {
      toast.error(err.message || "Invalid input.");
      setDisplayError(err.message || "Invalid input.");
      return;
    }

    const transaction = { to: recipient, value: amountInWei, chain: sepolia, account, client };
    sendTx(transaction);
  };

  const handleCopyToClipboard = () => {
    if (userAddress) {
      navigator.clipboard.writeText(userAddress)
        .then(() => {
          setIsCopied(true);
          toast.success("Address copied!");
        })
        .catch(err => {
          console.error("Failed to copy address: ", err);
          toast.error("Failed to copy address");
        });
    }
  };


  const isSendButtonDisabled = isSending || !recipient || !amount || connectedChainId !== sepolia.id;

  return (
     <div className="w-full max-w-md mx-auto p-6 bg-[#1A1A1A] rounded-xl shadow-lg border border-[#2C2C2C] mt-28 mb-16 text-white">

        {!wallet ? (
            <p className="text-center text-gray-400 py-4 mb-4">
                Please connect your wallet to Send or Receive funds.
            </p>
        ) : (
             <div className="mb-4 text-xs text-center p-2 rounded border border-[#2C2C2C] bg-[#0A0A0A] break-words">
                <p>Account: {userAddress ? `${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)}` : 'Loading...'}</p>
                 <p className={connectedChainId === sepolia.id ? 'text-green-400' : 'text-red-400'}>
                    Network: {connectedChainId ? `Connected (ID: ${connectedChainId})` : 'Loading...'} {connectedChainId !== sepolia.id ? ` - Expected: ${sepolia.id}` : '(Sepolia)'}
                </p>
             </div>
         )}
        {wallet && userAddress && (
             <>
             
                <div className="flex mb-6 border-b border-[#2C2C2C]">
                     <button
                         onClick={() => { setActiveView('send'); setDisplayError(null); /* Clear errors on tab switch */}}
                         className={`flex-1 py-2 text-center font-medium text-sm transition-colors duration-200 ${
                             activeView === 'send'
                                 ? 'border-b-2 border-purple-500 text-purple-400'
                                 : 'text-gray-400 hover:text-gray-200'
                         }`}
                     >
                         Send
                     </button>
                     <button
                         onClick={() => setActiveView('receive')}
                         className={`flex-1 py-2 text-center font-medium text-sm transition-colors duration-200 ${
                            activeView === 'receive'
                                 ? 'border-b-2 border-blue-500 text-blue-400'
                                 : 'text-gray-400 hover:text-gray-200'
                         }`}
                     >
                         Receive
                     </button>
                 </div>

             
                 <div>
                    
                     {activeView === 'send' && (
                        <motion.div key="send" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                           <h2 className="text-xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-5">
                                Send Sepolia ETH
                           </h2>
                      
                            <div className="mb-4">
                                <label htmlFor="recipient" className="block text-sm font-medium text-gray-300 mb-1">Recipient Address:</label>
                                <input type="text" id="recipient" className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2C2C2C] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                                       value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="0x..." disabled={isSending} />
                             </div>
                           <div className="mb-6">
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Amount (ETH):</label>
                                <input type="text" id="amount" className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2C2C2C] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                                     value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.01" disabled={isSending} />
                            </div>

                        
                           <motion.button whileHover={{ scale: isSending ? 1 : 1.03 }} whileTap={{ scale: isSending ? 1 : 0.98 }} onClick={handleSendEth}
                                          disabled={isSendButtonDisabled}
                                          className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-white flex items-center justify-center ${isSendButtonDisabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-400/30'}`}>
                                {isSending ? (
                                    <>
                                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                      Processing...
                                    </>
                                ) : 'Send ETH'}
                           </motion.button>

                          
                           {isSendSuccess && !displayError && (
                              <div className="mt-4 text-center text-sm text-green-400">
                                  Transaction submitted successfully!
                               </div>
                             )}
                           {displayError && (
                              <div className="mt-4 text-center text-sm text-red-400 bg-red-900/30 p-2 rounded border border-red-600">
                                   {displayError}
                              </div>
                           )}
                        </motion.div>
                     )}

                    
                    {activeView === 'receive' && (
                         <motion.div key="receive" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center">
                             <h2 className="text-xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-5">
                                Your Wallet Address
                            </h2>
                        
                            <div className="p-3 bg-white rounded-lg mb-4 inline-block shadow-md">
                                {userAddress ? (
                                    <QRCodeSVG value={userAddress} size={160} includeMargin={false} />
                                 ) : (
                                    <div className="w-[160px] h-[160px] flex items-center justify-center text-gray-500">Loading QR...</div>
                                )}
                             </div>

                            {/* Address Display and Copy Button */}
                            <div className="w-full flex items-center justify-center space-x-2 p-2 rounded bg-[#0A0A0A] border border-[#2C2C2C]">
                                 <p className="text-sm text-gray-300 break-all flex-1 text-center">
                                     {userAddress || "Loading Address..."}
                                 </p>
                                <button
                                     onClick={handleCopyToClipboard}
                                     title="Copy address"
                                     className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition duration-200"
                                     disabled={!userAddress}
                                 >
                                     <CopyIcon className="w-4 h-4" />
                                </button>
                            </div>
                            {isCopied && <span className="text-xs text-green-400 mt-2">Copied!</span>}

                             <p className="text-xs text-gray-400 mt-4 text-center px-4">
                                Scan this QR code or copy the address to receive funds on the {sepolia.name} network.
                            </p>
                         </motion.div>
                     )}
                 </div>
             </>
        )}
    </div>
  );
}

export default SendReceiveComponent; 