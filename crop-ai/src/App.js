import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import UserDash from "./UserDash";
import AdminDash from "./AdminDash";
import AdminSignup from "./AdminSignup";
import PrivateRoute from "./components/PrivateRoute";
import NewPrivate from "./components/NewPrivate";
import ForgotPassword from "./ForgotPassword";
import PlantResults from "./PlantResults";
import About from "./About";
import Slideshow from "./Slideshow";
import Manage from "./ManageUsers";
import "./App.css";
import { Component } from "react";
import Contact from "./Contact";
import Predict from "./Predict";
import Analyze from "./Analyze";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signup-admin" element={<AdminSignup />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/predict" element={<Predict />} />

            <Route
              exact
              path="/user-dash"
              element={
                <NewPrivate>
                  <UserDash />
                </NewPrivate>
              }
            />

            <Route
              exact
              path="/admin-dash"
              element={
                <PrivateRoute>
                  <AdminDash />
                </PrivateRoute>
              }
            />
            <Route path="/manage" element={<Manage />} />
            <Route path="/analyze" element={<Analyze />} />
            
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
