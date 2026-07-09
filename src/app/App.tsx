/* MARKER-MAKE-KIT-INVOKED */
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import CollaborationPage from "./components/CollaborationPage";
import FeaturesPage from "./components/FeaturesPage";
import ContactPage from "./components/ContactPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import DocumentEditor from "./components/DocumentEditor";
import UserProfile from "./components/UserProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/collaboration" element={<CollaborationPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents" element={<DocumentEditor />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
