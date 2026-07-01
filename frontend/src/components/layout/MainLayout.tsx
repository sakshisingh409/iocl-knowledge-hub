import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-iocl-bg">
      <Sidebar />
      <div className="ml-56 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
