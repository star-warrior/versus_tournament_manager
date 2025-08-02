import React, { useState, useEffect, useRef } from "react";
import trophy from "../../assets/pictures/trophy.png";
import axios from "axios";
import Logout from "./Logout";

function Navbar() {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("/auth/user", { withCredentials: true })
      .then((userRef) => {
        if (userRef) {
          setUser({
            name: userRef.data.displayName,
            photos: userRef.data.photos,
            emails: userRef.data.emails,
          });
        } else {
          setUser(null);
          window.location.href = "/";
        }
      })
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    console.log("User data updated:", user);
  }, [user]);

  // DropDown Logic
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div id="Navbar">
      <nav className="flex justify-between items-center text-center w-[100%] px-10  py-3 border-b-2 border-gray-300 bg-white">
        <div className="nav-title flex gap-3">
          <img src={trophy} className="w-8" alt="" />
          <h1 className="text-2xl font-bold">Versus.gg</h1>
        </div>
        <div className="nav-links flex align-middle gap-8">
          <a className="text-gray-600" href="/create">
            Create
          </a>
          <a className="text-gray-600" href="/dashboard">
            {" "}
            Dashboard
          </a>
          <a className="text-gray-600" href="/my-tournaments">
            {" "}
            My Tournaments
          </a>
        </div>
        <div className="account-info items-center flex gap-3">
          <div className="img">
            {user.photos && user.photos[0] && user.photos[0].value ? (
              <img
                src={user.photos[0].value}
                alt="User Avatar"
                className="w-12 h-12 rounded-full mb-4 cursor-pointer"
                crossOrigin="anonymous"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <span
                className="text-base cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                account info
              </span>
            )}

            {open && (
              <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="text-gray-700">
                  <Logout />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
