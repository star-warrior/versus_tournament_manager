import React from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  FileText,
  Image,
  Plus,
  Tag,
} from "lucide-react";

function Create_tournament() {
  const [data, setData] = useState({
    name: "",
    description: "",
    sport: "",
    date: "",
    location: "",
    picture:
      "https://img-cdn.hltv.org/gallerypicture/HzYmEAYdumZCnSueGLoBmJ.jpg?auto=compress&ixlib=java-2.1.0&m=%2Fm.png&mw=107&mx=20&my=473&q=75&w=800&s=8006cb8677010e039c3104cf4c729859",
    prize: "",
    city: "",
    state: "",
    banner:
      "https://www.shutterstock.com/image-vector/soccer-european-championship-congratulations-2024-260nw-2466200069.jpg",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  //! Submit the data using Axios
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting Data");
    setLoading(true);

    try {
      const submit = await axios.post("/api/tournament/", data, {
        withCredentials: true,
      });
      if (submit.status === 201) {
        console.log("Tournament created successfully");
        window.location.href = "/dashboard"; // Redirect to dashboard
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Create a Tournament
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in the details below to create your tournament
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Tournament Name *
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={data.name}
                    placeholder="Enter tournament name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="sport"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Sport Type *
                  </label>
                  <select
                    onChange={handleChange}
                    name="sport"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    required
                  >
                    <option value="">Select a sport</option>
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
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Description
                </label>
                <textarea
                  onChange={handleChange}
                  name="description"
                  value={data.description}
                  placeholder="Describe your tournament, rules, format, etc."
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none"
                />
              </div>
            </div>

            {/* Date and Prize Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                Date & Prize
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="date"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Tournament Date *
                  </label>
                  <input
                    onChange={handleChange}
                    type="date"
                    name="date"
                    value={data.date}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="prize"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Prize Pool *
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="prize"
                    value={data.prize}
                    placeholder="e.g., $1000, Trophies, Medals"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-blue-600" />
                Location Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    City *
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="city"
                    value={data.city}
                    placeholder="Enter city"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    State *
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="state"
                    value={data.state}
                    placeholder="Enter state"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Venue Address *
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="location"
                    value={data.location}
                    placeholder="Enter venue address"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Image className="w-6 h-6 mr-3 text-blue-600" />
                Tournament Images
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="picture"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Tournament Logo/Image
                  </label>
                  <input
                    onChange={handleChange}
                    type="url"
                    name="picture"
                    value={data.picture}
                    placeholder="Enter image URL"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                  />
                  <p className="text-xs text-gray-500">
                    This will be displayed as the tournament's main image
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="banner"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Banner Image
                  </label>
                  <input
                    onChange={handleChange}
                    type="url"
                    name="banner"
                    value={data.banner}
                    placeholder="Enter banner image URL"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                  />
                  <p className="text-xs text-gray-500">
                    This will be used as the tournament's banner/cover image
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating Tournament...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Create Tournament
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create_tournament;
