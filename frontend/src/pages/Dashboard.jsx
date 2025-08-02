import React from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";

import Tournament_card_for_creator from "../Components/Tournament_card_for_creator";
import My_tournaments_player from "../Components/My_tournaments_player";

function Dashboard() {
  //* Tab Navigation
  const [activeTab, setActiveTab] = useState("My Tournaments");

  const tabs = ["My Tournaments", "Explore"];

  const RenderTabContent = () => {
    switch (activeTab) {
      case "My Tournaments":
        return (
          <>
            <Tournament_card_for_creator />
          </>
        );

      case "Explore":
        return (
          <>
            <My_tournaments_player />
          </>
        );
    }
  };

  return (
    <div id="dashboard ">
      <Navbar />

      <div className="dashboard-info  mt-7 p-4">
        {/* <h1
          className="text-3xl font-bold text-center mb-7"
          style={{ fontFamily: "Montserrat" }}
        >
          Dashboard
        </h1> */}

        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-base font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <RenderTabContent />
      </div>
    </div>
  );
}

export default Dashboard;
