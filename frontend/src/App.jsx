import React from "react";
import Login from "./Components/Login";
import "./app.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Success from "./Components/Success";
import Create_tournament from "./pages/Create_tournament";
import Dashboard from "./pages/Dashboard";
import Landing_page from "./pages/Landing_page";
import ViewTournament from "./pages/ViewTournament";
import ViewBrackets from "./pages/viewBrackets";

// ? IMporting Pages

export default function App() {
  return (
    // <div className="App">
    //   <h1 className="text-2xl">Welcome to DrawMaker</h1>
    //   <p className="text-lg">This is a simple drawing application.</p>
    //   <Login />
    // </div>

    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Landing_page />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/success" element={<Success />} /> */}
        <Route path="/create" element={<Create_tournament />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tournament/:id" element={<ViewTournament />} />
        <Route path="/bracket/:id" element={<ViewBrackets />} />
      </Routes>
    </BrowserRouter>
  );
}
