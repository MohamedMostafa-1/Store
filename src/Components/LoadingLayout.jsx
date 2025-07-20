"use client";

import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";
import BottomNav from "./BottomNav";

const LoadingLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <HashLoader color="#f35c7a" size={80} />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      {children}
      <BottomNav/>
      <Footer />
    </>
  );
};

export default LoadingLayout;
