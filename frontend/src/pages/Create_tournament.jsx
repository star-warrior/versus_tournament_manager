import React from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

function Create_tournament() {
  const [data, setData] = useState({
    name: "",
    description: "",
    sport: "",
    date: "",
    location: "",
    picture:
      "https://img-cdn.hltv.org/gallerypicture/HzYmEAYdumZCnSueGLoBmJ.jpg?auto=compress&ixlib=java-2.1.0&m=%2Fm.png&mw=107&mx=20&my=473&q=75&w=800&s=8006cb8677010e039c3104cf4c729859",
  });

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

    try {
      const submit = await axios.post("/api/tournament/", data, {
        withCredentials: true,
      });
      if (submit.status === 201) {
        console.log("Tournament created successfully");
        window.location.href = "/dashboard"; // Redirect to success page
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar />

      <div className="h-screen display flex flex-col items-center ">
        <h1 className="text-center text-3xl font-bold mb-6 mt-6">
          Create a Tournament
        </h1>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex flex-col h-max gap-4 border-2 border-blue-400 rounded-lg p-6 w-max"
        >
          <div>
            <div className="nameBox flex gap-3 mb-6">
              <label htmlFor="name">Name: </label>
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                type="text"
                name="name"
                value={data.name}
                placeholder="Enter Name"
                className="border-2 border-gray-300 rounded-md px-3 py-1.5"
                required
              />
            </div>
            <div className="descriptionBox flex gap-3 mb-6">
              <label htmlFor="name">Description: </label>
              <textarea
                onChange={(e) => {
                  handleChange(e);
                }}
                type="text"
                name="description"
                value={data.description}
                placeholder="Enter Description"
                className="border-2 border-gray-300 rounded-md px-3 py-1.5"
              />
            </div>

            <div className="selectSport flex gap-3 mb-6">
              <label htmlFor="sport">Enter Sport: </label>
              <select
                onChange={(e) => {
                  handleChange(e);
                }}
                name="sport"
                id=""
                defaultValue="Enter Sport"
                className="border-2 border-gray-300 rounded-md px-3 py-1.5"
                required
              >
                <option value="enter">Enter a sport</option>
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

            <div className="date flex gap-3 mb-6">
              <label htmlFor="date">Enter Date: </label>
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                type="date"
                name="date"
                value={data.date}
                className="border-2 border-gray-300 rounded-md px-3 py-1.5"
                required
              />
            </div>

            <div className="address flex gap-3 mb-6">
              <label htmlFor="location">Address: </label>
              <textarea
                onChange={(e) => {
                  handleChange(e);
                }}
                type="text"
                name="location"
                value={data.location}
                placeholder="Enter Location"
                className="border-2 border-gray-300 rounded-md px-3 py-1.5"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-black border-2 border-blue-400 rounded-md px-5 w-max py-2.5 hover:bg-blue-700 hover:text-white transition-all duration-300"
          >
            Create{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create_tournament;
