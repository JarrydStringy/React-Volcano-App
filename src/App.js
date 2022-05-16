import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//components
import Header from "./components/Header";
import Footer from "./components/Footer";
//pages
import Home from "./pages/Home";
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import VolcanoList from './pages/VolcanoList';
import Volcano from './pages/Volcano';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/volcanolist" element={<VolcanoList />} />
          <Route path="/volcano" element={<Volcano />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}