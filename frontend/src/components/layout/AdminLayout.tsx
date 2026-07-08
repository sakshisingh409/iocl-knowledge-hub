import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import Footer from "../ui/Footer";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Admin Sidebar - Dark Theme, Fixed Width */}
      <AdminSidebar />
      
      {/* Admin Main Frame */}
      <div className="ml-72 flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <AdminNavbar />

        {/* Dynamic Pages outlet */}
        <main className="flex-1 px-8 py-8">
          <Outlet />
        </main>

        {/* Global Enterprise Footer */}
        <Footer />
      </div>
    </div>
  );
}
