import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import LandingPage   from "./pages/LandingPage";
import AuthPage      from "./pages/AuthPage";
import HomePage      from "./pages/HomePage";
import GroupsPage    from "./pages/GroupsPage";
import GroupRoomPage from "./pages/GroupRoomPage";
import ResourcesPage from "./pages/ResourcesPage";
import MapPage       from "./pages/MapPage";
import ProfilePage   from "./pages/ProfilePage";

// Layout
import AppLayout from "./components/layout/AppLayout";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/auth" replace />;
}

function PublicRoute({ children }) {
  const { token } = useAuth();
  return !token ? children : <Navigate to="/home" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Routes>
          {/* Public */}
          <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
          <Route path="/auth" element={<PublicRoute><AuthPage /></PublicRoute>} />

          {/* Protected — inside AppLayout (bottom nav) */}
          <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
            <Route path="/home"           element={<HomePage />} />
            <Route path="/groups"         element={<GroupsPage />} />
            <Route path="/groups/:id"     element={<GroupRoomPage />} />
            <Route path="/resources"      element={<ResourcesPage />} />
            <Route path="/map"            element={<MapPage />} />
            <Route path="/profile"        element={<ProfilePage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
