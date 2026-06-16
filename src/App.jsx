import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import MouseFollower from "./components/MouseFollower";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Page imports
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import WorkTogether from "./pages/WorkTogether";
import ServiceDetails3d from "./pages/ServiceDetails3d";
import ServiceDetailsCgi from "./pages/ServiceDetailsCgi";
import ServiceDetailsDigitalMarketing from "./pages/ServiceDetailsDigitalMarketing";
import ServiceDetailsGraphicDesign from "./pages/ServiceDetailsGraphicDesign";
import ServiceDetailsMotion from "./pages/ServiceDetailsMotion";
import ServiceDetailsSetDesign from "./pages/ServiceDetailsSetDesign";
import ServiceDetailsVideoEditing from "./pages/ServiceDetailsVideoEditing";

import "./App.css";

export default function App() {
  return (
    <Router>
      <Preloader />
      <MouseFollower />
      <Header />
      
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/service" element={<Service />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/worktogether" element={<WorkTogether />} />
              <Route path="/service-details-3d" element={<ServiceDetails3d />} />
              <Route path="/service-details-cgi" element={<ServiceDetailsCgi />} />
              <Route path="/service-details-digitalmarketing" element={<ServiceDetailsDigitalMarketing />} />
              <Route path="/service-details-graphicdesign" element={<ServiceDetailsGraphicDesign />} />
              <Route path="/service-details-motion" element={<ServiceDetailsMotion />} />
              <Route path="/service-details-setdesign" element={<ServiceDetailsSetDesign />} />
              <Route path="/service-details-videoediting" element={<ServiceDetailsVideoEditing />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>

      <ScrollToTop />
    </Router>
  );
}
