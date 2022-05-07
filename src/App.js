import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//components
import Header from "./components/Header";
import Footer from "./components/Footer";
//pages
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import VolcanoList from './pages/VolcanoList';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/volcanolist" element={<VolcanoList />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}