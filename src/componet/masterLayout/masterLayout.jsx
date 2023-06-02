import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../navbar/navbar";

export default function MasterLayout({logOut,user}) {
  return (
    <>
      <Navbar logOut={logOut} user={user}/>
      <div className="container  px-4">
        <Outlet />
      </div>
    </>
  );
}
