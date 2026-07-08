import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink, Globe, Shield, FileText } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200/80 bg-white/80 py-12 px-8 backdrop-blur-md">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* IOCL Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-iocl-orange text-lg font-black text-white shadow-md shadow-iocl-orange/20">
                I
              </div>
              <div>
                <p className="text-base font-extrabold leading-tight text-iocl-navy">Indian Oil Corporation</p>
                <p className="text-[10px] font-bold tracking-widest text-slate-400">KNOWLEDGE HUB</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 max-w-xs">
              The central, secure digital repository for IndianOil periodicals, technical documents, safety bulletins, and industry briefs, enhanced by intelligent search and AI integration.
            </p>
            <div className="flex gap-3 text-slate-400">
              <a href="https://iocl.com" target="_blank" rel="noopener noreferrer" className="hover:text-iocl-orange transition-colors">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-iocl-orange transition-colors">
                <Shield className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-iocl-orange transition-colors">
                <FileText className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-iocl-navy">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button onClick={() => navigate("/dashboard")} className="text-slate-500 hover:text-iocl-orange transition-colors flex items-center gap-1 cursor-pointer">
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/magazines")} className="text-slate-500 hover:text-iocl-orange transition-colors flex items-center gap-1 cursor-pointer">
                  Magazines
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/newspapers")} className="text-slate-500 hover:text-iocl-orange transition-colors flex items-center gap-1 cursor-pointer">
                  Newspapers
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/bookmarks")} className="text-slate-500 hover:text-iocl-orange transition-colors flex items-center gap-1 cursor-pointer">
                  Bookmarks
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/chat")} className="text-slate-500 hover:text-iocl-orange transition-colors flex items-center gap-1 cursor-pointer">
                  AI Chatbot
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate Offices */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-iocl-navy">HQ Information</h4>
            <ul className="space-y-3 text-xs text-slate-500">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                <span>
                  Indian Oil Corporation Ltd.<br />
                  Corporate Office, 3079, J B Tito Marg, Sadiq Nagar, New Delhi - 110049
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>+91-11-26260000</span>
              </li>
            </ul>
          </div>

          {/* Support and System */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-iocl-navy">System Support</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              For account issues, document uploads, or permissions requests, please contact Corporate IT Helpdesk.
            </p>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="mailto:helpdesk@iocl.in" className="flex items-center gap-2 text-slate-500 hover:text-iocl-orange transition-colors">
                  <Mail className="h-3.5 w-3.5" />
                  helpdesk@iocl.in
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-1 text-slate-500 hover:text-iocl-orange transition-colors">
                  System Health Status <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-slate-200/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-medium text-slate-400">
          <p>© {currentYear} Indian Oil Corporation Ltd. Internal usage only.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-iocl-orange transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-iocl-orange transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-iocl-orange transition-colors">IT Security Code</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
