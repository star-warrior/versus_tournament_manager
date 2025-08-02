import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  Users,
  MapPin,
  Trophy,
  Eye,
  Edit,
  SlidersHorizontal,
  LandPlot,
} from "lucide-react";

function My_tournaments_player() {
  const [tournaments, setTournaments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // FIlter Expansion
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [sport, setSport] = useState("");

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("request Sent");

      const TournamentRoute = `/api/tournament/filter?${
        city ? `city=${city}` : ""
      }&${state ? `state=${state}` : ""}&${sport ? `sport=${sport}` : ""}`;

      // User is authenticated, fetch tournaments
      const tournamentsRes = await axios.get(TournamentRoute, {
        withCredentials: true,
      });
      setTournaments(tournamentsRes.data.tournaments || []);
      console.log(tournamentsRes.data.meassage); // Fixed typo
      console.log(tournamentsRes.data.tournaments);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch tournaments");
      setTournaments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-50">
        <div className="text-xl">Loading tournaments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="flex flex-col gap-4 my-4 border-2 border-gray-200 rounded-md p-4">
          <div className="flex gap-8">
            {" "}
            <span>Add Filters</span>
            <SlidersHorizontal
              sizing={30}
              onClick={() => {
                setIsFilterExpanded((prev) => !prev);
              }}
            />
          </div>

          {isFilterExpanded && (
            <div className="flex">
              <form className="flex gap-4">
                <div className="flex gap-2">
                  <label htmlFor="cityName">City Name</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    id="cityName"
                  />
                </div>
                <div className="flex gap-2">
                  {" "}
                  <label htmlFor="stateName">State Name</label>
                  <input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    type="text"
                    id="stateName"
                  />
                </div>
                <div className="flex gap-2">
                  <label htmlFor="sport">Enter Sport: </label>
                  <select
                    value={sport}
                    onChange={(e) => {
                      setSport(e.target.value);
                    }}
                    name="sport"
                    id=""
                    className="border-2 border-gray-300 rounded-md px-3 py-1.5"
                    required
                  >
                    <option value="badminton">Badminton</option>
                    <option value="tennis">Tennis</option>
                    <option value="table-tennis">Table Tennis</option>
                    <option value="squash">Squash</option>
                    <option value="racquetball">Racquetball</option>
                    <option value="pickleball">Pickleball</option>
                    <option value="padel">Padel</option>
                    <option value="beach-tennis">Beach Tennis</option>
                  </select>
                </div>

                <button onClick={() => fetchTournaments()}>Search</button>
              </form>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center h-50">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 my-4 border-2 border-gray-200 rounded-md p-4">
        <div className="flex gap-8">
          {" "}
          <span>Add Filters</span>
          <SlidersHorizontal
            onClick={() => {
              setIsFilterExpanded((prev) => !prev);
            }}
          />
        </div>

        {isFilterExpanded && (
          <div className="flex">
            <form className="flex gap-4">
              <div className="flex gap-2">
                <label htmlFor="cityName">City Name</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  id="cityName"
                />
              </div>
              <div className="flex gap-2">
                {" "}
                <label htmlFor="stateName">State Name</label>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  id="stateName"
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="sport">Enter Sport: </label>
                <select
                  value={sport}
                  onChange={(e) => {
                    setSport(e.target.value);
                  }}
                  name="sport"
                  id=""
                  className="border-2 border-gray-300 rounded-md px-3 py-1.5"
                  required
                >
                  <option value="badminton">Badminton</option>
                  <option value="tennis">Tennis</option>
                  <option value="table-tennis">Table Tennis</option>
                  <option value="squash">Squash</option>
                  <option value="racquetball">Racquetball</option>
                  <option value="pickleball">Pickleball</option>
                  <option value="padel">Padel</option>
                  <option value="beach-tennis">Beach Tennis</option>
                </select>
              </div>

              <button onClick={() => fetchTournaments()}>Search</button>
            </form>
          </div>
        )}
      </div>

      {/* Tournament Cards */}
      {tournaments && tournaments.length > 0 ? (
        <div className="tournaments w-[100%] flex gap-8 py-4 flex-wrap">
          {tournaments.map((tournament, index) => (
            <div
              key={tournament.id || index} // Use tournament.id if available
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 min-w-[300px] max-w-[400px] flex-1"
            >
              <div className="flex gap-6 items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-normal text-gray-800 mb-1">
                    Name:{" "}
                    <span className="font-bold text-blue-600">
                      {tournament.name}
                    </span>
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Sport:{" "}
                    <span className="font-medium text-gray-800">
                      {capitalizeFirstLetter(tournament.sport)}
                    </span>
                  </p>
                </div>
                <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 flex-shrink-0">
                  <img
                    src={tournament.picture}
                    alt={tournament.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-tournament.jpg"; // Fallback image
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="text-sm">
                    Date:{" "}
                    <span className="font-medium">
                      {new Date(tournament.dateoftournament).toLocaleDateString(
                        "en-GB"
                      )}
                    </span>
                  </span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Users className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="text-sm">
                    Participants:{" "}
                    <span className="font-medium">
                      {tournament.participants || "-"}
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

                <div className="flex items-center text-gray-700">
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  <span className="text-sm">
                    Place:{" "}
                    <span className="font-medium">
                      {tournament.city}, {tournament.state}
                    </span>
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
                    onClick={() => handleParticipate(tournament.id)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <LandPlot className="w-4 h-4" />
                    <span className="font-medium">Participate</span>
                  </button>

                  <button
                    onClick={() => handleView(tournament.id)}
                    className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="font-medium">View</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-50">
          <div className="box bg-gray-100 border-2 border-dashed rounded-md border-blue-600 max-w-fit">
            <h1
              className="text-2xl font-bold py-1.5 px-3"
              style={{ fontFamily: "Montserrat" }}
            >
              No tournaments found
            </h1>
          </div>
        </div>
      )}
    </>
  );
}

export default My_tournaments_player;
