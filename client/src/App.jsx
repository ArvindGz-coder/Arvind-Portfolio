import { BrowserRouter, Routes, Route } from "react-router-dom";

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
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Portfolio */}
        <Route path="/" element={<Portfolio />} />

        {/* Admin Login*/}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        {/* Project Manager */}
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <ProjectsManager />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/messages" element={<MessagesManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
