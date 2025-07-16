import React from "react";
import Login from "./Components/Login";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Success from "./Components/Success";
import Create_tournament from "./pages/create_tournament";
import Dashboard from "./pages/Dashboard";
import Landing_page from "./pages/Landing_page";

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
        <Route path="/success" element={<Success />} />
        <Route path="/create" element={<Create_tournament />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
