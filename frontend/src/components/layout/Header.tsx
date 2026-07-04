import { Bell, Search, FileText, Newspaper, Bot } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { globalSearch, setGlobalSearch } = useAuth();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
  {
    title: "New Safety Bulletin Uploaded",
    icon: FileText,
    time: "10 mins ago",
    route: "/repository",
  },
  {
    title: "Today's Newspaper Available",
    icon: Newspaper,
    time: "1 hour ago",
    route: "/newspapers",
  },
  {
    title: "AI Chatbot Updated",
    icon: Bot,
    time: "Yesterday",
    route: "/chat",
  },
];

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-slate-100 bg-white/90 px-8 py-4 backdrop-blur-sm">
      <div className="relative flex-1 max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          placeholder="Search magazines, newspapers, topics..."
          className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-iocl-orange focus:bg-white focus:ring-2 focus:ring-iocl-orange/20"
        />
      </div>
      <div className="relative">

<button
  type="button"
  onClick={() => setShowNotifications(!showNotifications)}
  className="relative rounded-full p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-iocl-navy"
>

<Bell className="h-5 w-5" />

<span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-iocl-orange"/>

</button>

{showNotifications && (

<div className="absolute right-0 mt-3 w-80 rounded-2xl border bg-white shadow-2xl">

<div className="border-b px-5 py-4">

<h3 className="font-bold text-iocl-navy">
Notifications
</h3>

</div>

<div>

{notifications.map((item,index)=>{

const Icon=item.icon;

return(

<div
  key={index}
  onClick={() => {
    navigate(item.route);
    setShowNotifications(false);
  }}
  className="flex cursor-pointer items-start gap-4 border-b px-5 py-4 transition hover:bg-slate-50"
>

<Icon
size={20}
className="mt-1 text-iocl-orange"
/>

<div>

<p className="font-medium text-slate-700">

{item.title}

</p>

<p className="text-xs text-slate-400">

{item.time}

</p>

</div>

</div>

);

})}

</div>

</div>

)}

</div>
    </header>
  );
}
