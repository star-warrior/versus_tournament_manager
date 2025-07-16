import React from "react";
import Login from "../Components/Login";
import trophy from "../../assets/pictures/trophy.png";

function Landing_page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={trophy} className="mb-1 h-50" alt="" />
      <h1 className="font-bold text-2 mb-3">Welcome to Tournament Manager</h1>
      <Login />
    </div>
  );
}

export default Landing_page;
