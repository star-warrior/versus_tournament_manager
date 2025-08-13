import React, { useState, useEffect } from "react";
import { ChevronRight, PlaneTakeoff } from "lucide-react";
import axios from "axios";

function PlayerList({ tournamentId }) {
  const [playerData, setPlayerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expandList, setExpandList] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching players for tournament:", tournamentId);
        const response = await axios.get(
          `/api/player/find/tournament/${tournamentId}`,
          {
            withCredentials: true,
          }
        );
        setPlayerData(response.data.players);
        console.log("Players fetched successfully:", response.data.players);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, [tournamentId]);

  if (loading) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <span className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          {" "}
          Loading{" "}
        </span>
      </div>
    );
  }
  return (
    <div className="col-span-3 space-y-6">
      {playerData && playerData.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <span className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <ChevronRight
              onClick={() => {
                setExpandList((prev) => {
                  return !prev;
                });
              }}
              style={{ transform: `rotate(${expandList ? "90deg" : "0deg"})` }}
              className="w-5 h-5 mr-2 text-blue-600"
            />
            List of Players
          </span>

          {expandList && (
            <div className="mt-4">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="text-left px-4 py-2 border-b">No.</th>
                    <th className="text-left px-4 py-2 border-b">Name</th>
                    <th className="text-left px-4 py-2 border-b">Seed</th>
                    <th className="text-left px-4 py-2 border-b">Email</th>
                    <th className="text-left px-4 py-2 border-b">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {playerData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{idx + 1}</td>
                      <td className="px-4 py-2 border-b">{row.name}</td>
                      <td className="px-4 py-2 border-b">{row.seed}</td>
                      <td className="px-4 py-2 border-b">{row.email_id}</td>
                      <td className="px-4 py-2 border-b">
                        {row.contact_number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <span className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <ChevronRight className="w-5 h-5 mr-2 text-blue-600" />
            No Players Found
          </span>
        </div>
      )}
    </div>
  );
}

export default PlayerList;
