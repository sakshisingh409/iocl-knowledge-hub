import AdminUploadMagazinePage from "./pages/admin/AdminUploadMagazinePage";
import AdminUploadNewspaperPage from "./pages/admin/AdminUploadNewspaperPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MagazinesPage from "./pages/MagazinesPage";
import NewspapersPage from "./pages/NewspapersPage";
import BookmarksPage from "./pages/BookmarksPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import HomePage from "./pages/HomePage";

// Admin Interface Imports
import AdminLayout from "./components/layout/AdminLayout";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminPublicationsPage from "./pages/admin/AdminPublicationsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";

// Global UI Additions
import CursorGlow from "./components/ui/CursorGlow";

function RootRedirect() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/home" : "/login"} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Global mouse glow trail tracking */}
        <CursorGlow />

        <Routes>
          {/* Public Employee Routes */}
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/home" element={<HomePage />} />

          {/* Protected Employee Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/magazines" element={<MagazinesPage />} />
              <Route path="/newspapers" element={<NewspapersPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Admin Control Routes (Isolated Admin layouts) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<AdminProtectedRoute />}>
  <Route element={<AdminLayout />}>
    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
    <Route path="/admin/publications" element={<AdminPublicationsPage />} />
    <Route path="/admin/users" element={<AdminUsersPage />} />
    <Route path="/admin/profile" element={<AdminProfilePage />} />

    <Route
      path="/admin/upload-magazine"
      element={<AdminUploadMagazinePage />}
    />

    <Route
      path="/admin/upload-newspaper"
      element={<AdminUploadNewspaperPage />}
    />
  </Route>
</Route>

          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
