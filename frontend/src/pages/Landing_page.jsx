import React from "react";
import Login from "../Components/Login";
import trophy from "../../assets/pictures/trophy.png";

import * as images from "../../assets/pictures/card_image/card_image.js";
import { Heart } from "lucide-react";

function Landing_page() {
  return (
    <div id="landing-page" className="h-screen">
      {/* //! Navbar */}
      <div className="flex navbar items-center w-full px-20 py-5 justify-between">
        <div className="nav-title flex items-center gap-3">
          <img src={trophy} className="h-[45px]" alt="Logo" />
          <span
            className="text-2xl font-bold text-[var(--text)]"
            style={{ fontFamily: "var(--main-font)" }}
          >
            Versus
          </span>
        </div>
        <div className="nav-links flex items-center gap-10">
          <Login text={null} />
        </div>
      </div>
      <hr />
      {/* //! Hero Section */}
      <div className="hero flex flex-col items-center justify-center max-h-fit">
        <div className="py-25 flex flex-col items-center justify-center gap-5 text-center">
          <span
            className="text-5xl font-bold text-[var(--text)]"
            style={{ fontFamily: "var(--main-font)" }}
          >
            {" "}
            Tournament Hosting Made Simple.
          </span>
          <span
            style={{ fontFamily: "var(--main-font)" }}
            className="text-6xl mt-3 font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]  bg-clip-text text-transparent"
          >
            {" "}
            Seamless Scheduling. <br /> Maximum Impact.
          </span>
          <span
            className="text-xl mt-2 font-light text-black w-3/5"
            style={{ fontFamily: "var(--sub-font)" }}
          >
            Effortlessly organize and manage your tournaments—create events,
            generate seeded brackets, assign match winners, and crown champions,{" "}
            <br />
            <span className="font-normal">All in One Place.</span>
          </span>
          <div className="mt-1">
            <Login text={"Create a Tournamnt"} />
          </div>
        </div>
      </div>
      <hr />
      {/* //! Benifits Cards */}
      <div className="benifits">
        <div className="flex flex-col gap-4 items-center justify-center py-10">
          <span
            className="text-4xl font-bold"
            style={{ fontFamily: "var(--main-font)" }}
          >
            What Makes Versus Impactful
          </span>
          <span
            className="text-xl font-light text-black w-3/5 text-center"
            style={{ fontFamily: "var(--sub-font)" }}
          >
            Simple Few Steps of Setup and Tournament is Up and Ready
          </span>

          {/*//! Cards  */}

          <div className="card-div flex items-center gap-20 mt-10 justify-between px-20">
            <div
              className="card flex flex-col items-center gap-5 text-center bg-[var(--bg-secondary)] h-80 w-75 py-7 px-15 rounded-lg"
              style={{ fontFamily: "var(--sub-font)" }}
            >
              <img src={images.easy} alt="Easy to Use" className="w-20" />
              <span className="text-2xl  font-bold">Easy to Use</span>
              <span className="text-xl font-light  max-w-40">
                {" "}
                Easily Create Tournament and Add Players Using Intuitive UI
              </span>
            </div>
            <div
              className="card flex flex-col items-center gap-5 text-center bg-[var(--bg-secondary)] h-80 py-7 px-15 rounded-lg"
              style={{ fontFamily: "var(--sub-font)" }}
            >
              <img src={images.bracket} alt="Easy to Use" className="w-20" />
              <span className="text-2xl  font-bold">Automatic Brackets</span>
              <span className="text-xl font-light  max-w-50">
                {" "}
                Generate Brackets with Seeds and Bye Rounds
              </span>
            </div>
            <div
              className="card flex flex-col items-center gap-5 text-center bg-[var(--bg-secondary)] h-80 w-75 py-7 px-15 rounded-lg"
              style={{ fontFamily: "var(--sub-font)" }}
            >
              <img src={images.match} alt="Easy to Use" className="w-20" />
              <span className="text-2xl  font-bold">Simple Match Handling</span>
              <span className="text-xl font-light  max-w-40">
                {" "}
                Select Matches. <br />
                Choose Winners.
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* //! Closure Section */}
      <div className="closure h-80 bg-[var(--primary)] ">
        <div className="flex flex-col items-center justify-center h-full">
          <span
            className="text-white font-bold text-3xl flex gap-4"
            style={{ fontFamily: "var(--main-font)" }}
          >
            <img src={trophy} className="h-10" alt="" />
            Kick Off Your First Big Event!
          </span>
          <span
            className="text-white text-xl mt-8 font-light w-3/5 text-center"
            style={{ fontFamily: "var(--sub-font)" }}
          >
            Unleash the excitement—your championship journey starts now! <br />{" "}
            Sign in with Google and take charge of your tournament. <br /> The
            stage is set, the crowd is waiting—step in and make your tournament
            legendary!
          </span>
        </div>
      </div>

      <hr />
      {/* Footer Section  */}
      <footer className="">
        <div className="flex flex-col gap-2 justify-center items-center py-5">
          <span
            className="text-gray-600 text-sm flex gap-1"
            style={{ fontFamily: "var(--sub-font)" }}
          >
            With <Heart color="#ff0000" size={20} /> by{" "}
            <span className="text-[var(--primary)] ">Jay Mehta</span>
          </span>
          <span
            className="text-gray-600 text-sm"
            style={{ fontFamily: "var(--sub-font)" }}
          >
            Icons by FlatIcon.
          </span>
          <span
            className="text-gray-600 text-sm"
            style={{ fontFamily: "var(--sub-font)" }}
          >
            © {new Date().getFullYear()} Versus. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Landing_page;
