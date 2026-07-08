import { Outlet } from "react-router-dom";
import Header from "./Header";
import SidebarV2 from "./SidebarV2";
import Footer from "../ui/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-iocl-bg flex">
      {/* Employee Sidebar navigation */}
      <SidebarV2 />
      
      {/* Main Page Area */}
      <div className="ml-72 flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 px-8 py-8">
          <Outlet />
        </main>
        {/* Enterprise Global Footer */}
        <Footer />
      </div>
    </div>
  );
}
