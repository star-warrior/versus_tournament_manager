import React, { useState, useEffect } from "react";
import axios from "axios";
import Logout from "./Logout";

function Success() {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("/auth/user", { withCredentials: true })
      .then((res) =>
        setUser({
          name: res.data.displayName,
          photos: res.data.photos,
          emails: res.data.emails,
        })
      )
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    console.log("User data updated:", user);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Scoreboard</h1>
      {user ? (
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">User Information</h2>

          <div className="flex gap-5">
            <div className="img">
              {user.photos && user.photos[0] && user.photos[0].value ? (
                <img
                  src={user.photos[0].value}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full mb-4"
                  crossOrigin="anonymous"
                />
              ) : null}
            </div>
            <div>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {user.emails && user.emails[0] ? user.emails[0].value : ""}
              </p>
            </div>
          </div>

          <Logout />
        </div>
      ) : (
        <p className="text-red-500">You are not logged in.</p>
      )}
    </div>
  );
}

export default Success;
