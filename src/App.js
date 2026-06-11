import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Particles from "./components/Particles";
import Onboarding from "./components/Onboarding";
import ToastProvider from "./components/Toast";
import AutoLogout from "./components/AutoLogout";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Actions from "./pages/Actions";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import HowItWorks from "./pages/HowItWorks";
import ScanHistory from "./pages/ScanHistory";
import Tips from "./pages/Tips";

function InnerApp() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem("onboardingDone");
    if (!done && !isLanding) setShowOnboarding(true);
  }, [isLanding]);

  if (isLanding) {
    return (
      <div key="landing" className="page-enter">
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    );
  }

  return (
    <>
      <Particles />
      {showOnboarding && (
        <Onboarding onFinish={() => {
          localStorage.setItem("onboardingDone", "true");
          setShowOnboarding(false);
        }} />
      )}
      <div style={{position:"relative",zIndex:1}}>
        <Navbar />
        <AutoLogout />
        <div key={location.pathname} className="page-enter">
          <div style={{maxWidth:"640px",margin:"0 auto",padding:"0 16px"}}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
              <Route path="/actions" element={<ProtectedRoute><Actions /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><ScanHistory /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ToastProvider />
      <InnerApp />
    </Router>
  );
}
