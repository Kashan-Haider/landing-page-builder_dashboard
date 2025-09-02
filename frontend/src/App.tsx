import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./landingPageDashboard/LandingPageDashboard";
import ContentForm from "./pages/ContentForm";
import CreateLandingPage from "./pages/CreateLandingPage";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--bg-primary)]">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateLandingPage />} />
          <Route path="/create-advanced" element={<ContentForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
