import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import {
  Calendar,
  Users,
  Trophy,
  Edit,
  Eye,
  Search,
  Plus,
  Filter,
  MapPin,
  Clock,
} from "lucide-react";

function Dashboard() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    // First check if user is authenticated by calling /auth/user
    axios
      .get("/auth/user", { withCredentials: true })
      .then((userRes) => {
        if (userRes.data) {
          // User is authenticated, fetch tournaments
          return axios.get("/api/tournament/", { withCredentials: true });
        } else {
          // Redirect to login if not authenticated
          window.location.href = "/";
        }
      })
      .then((res) => {
        if (res) {
          setTournaments(res.data.tournaments || []);
          console.log(res.data.meassage);
          console.log(res.data.tournaments);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setTournaments([]);
      });
  }, []);

  return (
    <div id="dashboard ">
      <Navbar />

      <div className="dashboard-info  mt-7 p-4">
        <h1 className="text-3xl font-bold text-center mb-7">Dashboard</h1>

        <div className="tournaments w-[100%] flex gap-8 py-4">
          {tournaments.map((tournament, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex gap-6 items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Name:{" "}
                    <span className="text-blue-600">{tournament.name}</span>
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Sport:{" "}
                    <span className="font-medium text-gray-800">
                      {tournament.sport}
                    </span>
                  </p>
                </div>
                <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 flex-shrink-0">
                  <img
                    src={tournament.picture}
                    alt={tournament.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="text-sm">
                    Date:{" "}
                    <span className="font-medium">
                      {tournament.dateoftournament}
                    </span>
                  </span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Clock className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm">
                    Time: <span className="font-medium">{tournament.date}</span>
                  </span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Users className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="text-sm">
                    Participants:{" "}
                    <span className="font-medium">
                      {tournament.participants}
                    </span>
                  </span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                  <span className="text-sm">
                    Prize:{" "}
                    <span className="font-medium text-green-600">
                      {tournament.prize}
                    </span>
                  </span>
                </div>

                <div className="flex items-center text-gray-700">
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  <span className="text-sm">
                    Location:{" "}
                    <span className="font-medium">{tournament.location}</span>
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs text-gray-500 mb-3">
                  Description:{" "}
                  <span className="text-gray-700">
                    {tournament.description}
                  </span>
                </p>

                <div className="flex space-x-2">
                  <button
                    // onClick={() => handleView(tournament.id)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="font-medium">View</span>
                  </button>

                  <button
                    // onClick={() => handleEdit(tournament.id)}
                    className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="font-medium">Edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
