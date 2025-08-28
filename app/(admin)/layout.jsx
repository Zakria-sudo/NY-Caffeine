import Header from "@/components/headers/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col w-full h-full">
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
