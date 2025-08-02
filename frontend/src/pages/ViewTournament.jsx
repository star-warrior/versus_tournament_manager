import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import {
  Calendar,
  Users,
  Trophy,
  MapPin,
  ArrowLeft,
  Clock,
  User,
  Tag,
  CarIcon,
} from "lucide-react";

import UploadPlayers from "../Components/UploadPlayers";

function ViewTournament() {
  const { id } = useParams();
  const navigate = useNavigate();

  //? Tournament information
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //? Players information
  const [players, setPlayers] = useState(null);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [errorPlayers, setErrorPlayers] = useState(null);

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  //! Fetch Tournament Details
  useEffect(() => {
    const fetchTournament = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/api/tournament/${id}`, {
          withCredentials: true,
        });

        setTournament(response.data.tournament);
      } catch (error) {
        console.error("Error fetching tournament:", error);
        if (error.response?.status === 404) {
          setError("Tournament not found");
        } else {
          setError("Failed to fetch tournament details");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTournament();
    }
  }, [id]);

  //! Fetch Players Details

  // useEffect(() => {
  //   const fetchPlayers = async () => {
  //     try {
  //       setLoadingPlayers(true);
  //       setErrorPlayers(null);

  //       const response = await axios.get(`/api/player/tournament/${id}`, {
  //         withCredentials: true,
  //       });

  //       setPlayers(response.data.players);
  //     } catch (error) {
  //       console.error("Error fetching tournament:", error);
  //       if (error.response?.status === 404) {
  //         setErrorPlayers("Tournament not found");
  //       } else {
  //         setErrorPlayers("Failed to fetch tournament details");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (id) {
  //     fetchPlayers();
  //   }
  // }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleBrackets = () => {
    navigate(`/bracket/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading tournament details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleGoBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center mx-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return null;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleGoBack}
              className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Tournaments
            </button>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Hero Section */}
              <div
                className="relative h-64 w-full bg-no-repeat bg-cover bg-opacity-30"
                style={{ backgroundImage: `url(${tournament.banner_pic})` }}
              >
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-2">
                      {tournament.name}
                    </h1>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex items-center">
                        <Tag className="w-5 h-5 mr-2" />
                        <span className="text-lg">
                          {capitalizeFirstLetter(tournament.sport)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Trophy className="w-5 h-5 mr-2" />
                        <span className="text-lg">${tournament.prize}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tournament Image */}
              <div className="relative -mt-16 mx-8">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  <img
                    src={tournament.picture}
                    alt={tournament.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder-tournament.jpg";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Tournament Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <User className="w-6 h-6 mr-2 text-blue-600" />
                  About This Tournament
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {tournament.description ||
                    "No description available for this tournament."}
                </p>
              </div>

              {/* Tournament Info Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Tournament Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Tournament Date</p>
                        <p className="font-semibold text-gray-800">
                          {new Date(
                            tournament.dateoftournament
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                      <Users className="w-6 h-6 mr-3 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Participants</p>
                        <p className="font-semibold text-gray-800">
                          {tournament.participants || "TBD"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                      <Trophy className="w-6 h-6 mr-3 text-yellow-600" />
                      <div>
                        <p className="text-sm text-gray-600">Prize Pool</p>
                        <p className="font-semibold text-gray-800 text-green-600">
                          ${tournament.prize}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-red-50 rounded-lg">
                      <MapPin className="w-6 h-6 mr-3 text-red-600" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-semibold text-gray-800">
                          {tournament.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* //! Players Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Players
                </h3>
                {players ? (
                  <div className="space-y-4">
                    {players.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center p-4 bg-gray-50 rounded-lg"
                      >
                        <User className="w-6 h-6 mr-3 text-gray-600" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <UploadPlayers tournamentId={tournament.id} />
                )}
              </div>
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-6">
              {/* Location Details Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-600" />
                  Location Details
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">City</p>
                    <p className="font-semibold text-gray-800">
                      {tournament.city}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">State</p>
                    <p className="font-semibold text-gray-800">
                      {tournament.state}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Venue</p>
                    <p className="font-semibold text-gray-800">
                      {tournament.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-600">Sport Type</span>
                    <span className="font-semibold text-blue-600">
                      {capitalizeFirstLetter(tournament.sport)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-600">Prize Money</span>
                    <span className="font-semibold text-green-600">
                      ${tournament.prize}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-600">Status</span>
                    <span className="font-semibold text-purple-600">
                      {new Date(tournament.dateoftournament) > new Date()
                        ? "Upcoming"
                        : "Completed"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={handleBrackets}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold"
                  >
                    Brackets
                  </button>
                  <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold">
                    Share Tournament
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewTournament;
