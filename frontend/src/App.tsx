import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./landingPageDashboard/LandingPageDashboard";
import CreateLandingPage from "./pages/CreateLandingPage.tsx";
import AdminLogin from './pages/AdminLogin';
import ClientLogin from './pages/ClientLogin';
import ClientDashboard from './pages/ClientDashboard';
import EmployeeLogin from './pages/EmployeeLogin';
import AdminUserManagement from './pages/AdminUserManagement';
import DebugAuth from './pages/DebugAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation.tsx';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-[var(--bg-primary)]">
          <Routes>
            {/* Public login routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/client/login" element={<ClientLogin />} />
            <Route path="/employee/login" element={<EmployeeLogin />} />
            
            {/* Debug route */}
            <Route path="/debug-auth" element={<DebugAuth />} />
            
            {/* Protected routes - Client */}
            <Route path="/client/*" element={
              <ProtectedRoute requiredRole={["CLIENT"]}>
                <Routes>
                  <Route path="/dashboard" element={<ClientDashboard />} />
                  <Route path="/create" element={<CreateLandingPage />} />
                </Routes>
              </ProtectedRoute>
            } />
            
            {/* Protected routes - Admin and Employee */}
            <Route path="/*" element={
              <ProtectedRoute requiredRole={["ADMIN", "EMPLOYEE"]}>
                <Navigation />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/admin/users" element={<AdminUserManagement />} />
                </Routes>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
