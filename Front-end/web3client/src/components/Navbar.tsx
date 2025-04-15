// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import { Link } from "react-router-dom";
// import { ConnectButton, lightTheme } from "thirdweb/react";
// import { client } from "../client";
// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);


//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <motion.nav
//       className={`fixed top-0 left-0 w-full ${
//         scrolled ? "bg-white shadow-lg dark:bg-black" : "bg-transparent"
//       } backdrop-blur-lg transition-all duration-300 text-black dark:text-white p-4 flex justify-between items-center z-50`}
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Logo */}
//       <motion.div
//   className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   transition={{ duration: 1 }}
// >
//   <Link to="/" className="block">
//   MediVoice
//   </Link>
// </motion.div>

//       {/* Right-side Links (Desktop) */}
//       <div className="hidden md:flex space-x-6 ml-auto mr-10">
//         <Link to="/" className="hover:text-purple-400 transition-all">Home</Link>
//         <Link to="/addcomplaint" className="hover:text-purple-400 transition-all">Add Complaint</Link>
//         <Link to="/topcomplaints" className="hover:text-purple-400 transition-all">Complaints</Link>
//         <Link to="/Transction" className="hover:text-purple-400 transition-all">Transction</Link>
//         <Link to="/HealthNews" className="hover:text-purple-400 transition-all">HealthNews</Link>

//          <ConnectButton
//                   client={client}
//                   appMetadata={{
//                     name: "Example app",
//                     url: "https://example.com",
//                   }}
//                 />
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="md:hidden ml-auto">
//         <button onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X size={30} /> : <Menu size={30} />}
//         </button>
//       </div>

//       {/* Mobile Menu (Solid Dark Background) */}
//       <motion.div
//         className={`fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center space-y-6 transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: isOpen ? 1 : 0 }}
//       >
//         <button
//           className="absolute top-5 right-5 text-white"
//           onClick={() => setIsOpen(false)}
//         >
//           <X size={30} />
//         </button>
//         <Link to="/" className="text-white text-lg hover:text-purple-400 transition-all" onClick={() => setIsOpen(false)}>Home</Link>
//         <Link to="/addcomplaint" className="text-white text-lg hover:text-purple-400 transition-all" onClick={() => setIsOpen(false)}>Report Issue</Link>
//         <Link to="/topcomplaints" className="text-white text-lg hover:text-purple-400 transition-all" onClick={() => setIsOpen(false)}>Complaints</Link>
//         <Link to="/Transction" className="hover:text-purple-400 transition-all">Transction</Link>
//         <Link to="/HealthNews" className="hover:text-purple-400 transition-all">HealthNews</Link>
        
//          <ConnectButton
//                   client={client}
//                   appMetadata={{
//                     name: "Example app",
//                     url: "https://example.com",
//                   }}
//                 />
//       </motion.div>
//     </motion.nav>
//   );
// }
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const account = useActiveAccount();
  const isConnected = !!account;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full ${
        scrolled ? "bg-white shadow-lg dark:bg-black" : "bg-transparent"
      } backdrop-blur-lg transition-all duration-300 text-black dark:text-white p-4 flex justify-between items-center z-50`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Link to="/" className="block">
          MediVoice
        </Link>
      </motion.div>

      <div className="hidden md:flex space-x-6 ml-auto mr-4 items-center"> {/* Adjusted margin */}
    
        <Link to="/" className="hover:text-purple-400 transition-all">Home</Link>
        <Link to="/topcomplaints" className="hover:text-purple-400 transition-all">Complaints</Link>
        <Link to="/HealthNews" className="hover:text-purple-400 transition-all">HealthNews</Link>

        
        {isConnected && (
          <>
            <Link to="/addcomplaint" className="hover:text-purple-400 transition-all">Add Complaint</Link>
       
            <Link to="/Transction" className="hover:text-purple-400 transition-all">Transaction</Link>
          </>
        )}

      
         <ConnectButton
           client={client}
           appMetadata={{
             name: "MediVoice",
             url: window.location.origin, 
           }}
        
         />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden ml-auto">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 transition-transform duration-300 ${ // Slightly nicer background
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <button
          className="absolute top-5 right-5 text-white"
          onClick={closeMobileMenu} 
        >
          <X size={30} />
        </button>

        <Link to="/" className="text-white text-lg hover:text-purple-400 transition-all" onClick={closeMobileMenu}>Home</Link>
        <Link to="/topcomplaints" className="text-white text-lg hover:text-purple-400 transition-all" onClick={closeMobileMenu}>Complaints</Link>
        <Link to="/HealthNews" className="text-white text-lg hover:text-purple-400 transition-all" onClick={closeMobileMenu}>HealthNews</Link>

        {isConnected && (
          <>
            <Link to="/addcomplaint" className="text-white text-lg hover:text-purple-400 transition-all" onClick={closeMobileMenu}>Add Complaint</Link>
            <Link to="/Transction" className="text-white text-lg hover:text-purple-400 transition-all" onClick={closeMobileMenu}>Transaction</Link>
          </>
        )}

        <div className="mt-6">
          <ConnectButton
            client={client}
            appMetadata={{
              name: "MediVoice",
              url: window.location.origin,
            }}
          />
        </div>
      </motion.div>
    </motion.nav>
  );
}