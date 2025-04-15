

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useActiveAccount } from "thirdweb/react";
import { client } from "./client";

import { ConnectButton } from "thirdweb/react";

import Home from "./pages/Home";
import AddComplaint from "./pages/AddComplaint";
import TopComplaints from "./pages/TopComplaints";
import PrivacyTrustPage from "./pages/PrivacyTrustPage";
import ContactPage from "./pages/ContactPage";
import HealthNews from "./pages/News";
import Transction from "./pages/Transction";

const SimpleConnectionWarning: React.FC = () => (
    <div className="flex flex-col items-center justify-center mt-16 mb-8 text-center p-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 p-6 rounded-lg shadow-sm max-w-md">
            <h3 className="text-lg font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
                ⚠️ Wallet Connection Required
            </h3>
			<ConnectButton
           client={client}
           appMetadata={{
             name: "MediVoice", 
             url: window.location.origin,
           }}
        
         />
            <p className="mb-4 text-yellow-700 dark:text-yellow-300 text-sm">
                Please connect your wallet using the button in the navigation bar to access this page.
            </p>
        </div>
    </div>
);
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const account = useActiveAccount();
    return account ? <>{children}</> : <SimpleConnectionWarning />;
};

export function App() {
    const navbarHeight = "80px";

    return (
        <Router>
        

            <main style={{ paddingTop: navbarHeight }}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/TopComplaints" element={<TopComplaints />} />
                    <Route path="/Privacy&Trust" element={<PrivacyTrustPage />} />
                    <Route path="/ContactUs" element={<ContactPage />} />
					<Route
                        path="/HealthNews"
                        element={

                                <HealthNews />

                        }
                    />
                    {/* Protected Routes */}
                    <Route
                        path="/AddComplaint"
                        element={
                            <ProtectedRoute>
                                <AddComplaint />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/Transction"
                        element={
                            <ProtectedRoute>
                                <Transction />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
            </main>
        </Router>
    );
}
