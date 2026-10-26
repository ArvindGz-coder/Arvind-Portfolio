import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SmoothScrollProvider from "./context/SmoothScroll";
import LetsTalkProvider from "./context/LetsTalkContext";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/ui/Preloader";
import LetsTalkModal from "./components/ui/LetsTalkModal";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectsManager from "./pages/admin/ProjectsManager";
import MessagesManager from "./pages/admin/MessagesManager";

function Portfolio() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <LetsTalkProvider>
      <SmoothScrollProvider>
        {/* Immersive Hooking Loading Preloader */}
        <Preloader onComplete={() => setLoadingComplete(true)} />

        {/* Global Direct "Let's Talk" Modal */}
        <LetsTalkModal />

        <div className="relative min-h-screen bg-[#030712] text-white selection:bg-indigo-500/30 selection:text-white">
          {/* Custom Interactive Follower Cursor */}
          <CustomCursor />

          {/* Global Ambient Noise/Grid Texture */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {/* Subtle Cyber Grid */}
            <div
              className="h-full w-full opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            {/* Deep Void Ambient Radial Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[800px] w-[1000px] bg-gradient-to-b from-indigo-900/10 via-cyan-900/5 to-transparent blur-[140px]" />
          </div>

          {/* Fixed Glassmorphism Navbar */}
          <Navbar />

          {/* Main Content Sections */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </SmoothScrollProvider>
    </LetsTalkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Portfolio */}
        <Route path="/" element={<Portfolio />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Command Center */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
