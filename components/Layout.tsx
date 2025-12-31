
import React from 'react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const LINKEDIN_URL = "https://www.linkedin.com/company/libey-buildtech";

const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  const [imgError, setImgError] = React.useState(false);
  const src = "/logo.png"; // place logo in public/logo.png

  if (!imgError) {
    return (
      <img
        src={src}
        alt="LIBEY BuildTech"
        className={`${className} object-contain`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lMetallic" x1="20" y1="20" x2="60" y2="80">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="50%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id="lBlue" x1="38" y1="25" x2="38" y2="65">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>

      <path d="M10 30 L50 10 L90 30 V70 L50 90 L10 70 Z" fill="#020617" />
      <path d="M28 22 V72 H62 V60 H40 V22 H28Z" fill="url(#lMetallic)" />
      <path d="M35 25 V65 H58 V58 H42 V25 H35Z" fill="url(#lBlue)" />

      <g stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round">
        <path d="M48 22 H75 L88 40 L70 50" />
        <path d="M70 50 L88 62 L75 78 H48" />
        <path d="M48 22 V78" />
        <path d="M48 50 H70" />
      </g>

      <g fill="#F8FAFC">
        <circle cx="48" cy="22" r="3" />
        <circle cx="75" cy="22" r="3" />
        <circle cx="88" cy="40" r="3" />
        <circle cx="70" cy="50" r="3" />
        <circle cx="48" cy="50" r="3" />
        <circle cx="88" cy="62" r="3" />
        <circle cx="75" cy="78" r="3" />
        <circle cx="48" cy="78" r="3" />
      </g>
    </svg>
  );
};

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: AppTab.HOME, label: 'Home' },
    { id: AppTab.SERVICES, label: 'Services' },
    { id: AppTab.HOW_IT_WORKS, label: 'Process' },
    { id: AppTab.CASE_EXAMPLE, label: 'Case Example' },
    { id: AppTab.PRODUCTS, label: 'Tools' },
    { id: AppTab.PRICING, label: 'Pricing' },
    { id: AppTab.TALK_TO_EXPERT, label: 'Talk to Expert' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div onClick={() => setActiveTab(AppTab.HOME)} className="flex items-center cursor-pointer">
            <Logo className="w-14 h-14 mr-4" />
            <div>
              <div className="text-2xl font-black tracking-tight">LIBEY</div>
              <div className="text-xs tracking-[0.4em] text-blue-600 uppercase">BuildTech</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md font-semibold ${
                  activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="flex-grow">{children}</main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
          <div>
            <div className="flex items-center mb-6">
              <Logo className="w-12 h-12 mr-4" />
              <div className="text-white font-black text-xl">LIBEY BuildTech</div>
            </div>

            <p className="mb-6 max-w-sm">
              BIM-led planning and cost-control consultancy helping teams prevent risk before construction begins.
            </p>

            <div className="flex flex-col space-y-4">
              <a
                href="mailto:libeybuildtech@gmail.com"
                className="text-white font-semibold hover:text-blue-400"
              >
                libeybuildtech@gmail.com
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center w-fit px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-blue-600 transition-all"
              >
                <i className="fa-brands fa-linkedin-in mr-3"></i>
                Follow us on LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs">Consultancy</h4>
            <ul className="space-y-4">
              <li><button onClick={() => setActiveTab(AppTab.SERVICES)}>Services</button></li>
              <li><button onClick={() => setActiveTab(AppTab.HOW_IT_WORKS)}>Process</button></li>
              <li><button onClick={() => setActiveTab(AppTab.CASE_EXAMPLE)}>Case Example</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs">Engage</h4>
            <button
              onClick={() => setActiveTab(AppTab.TALK_TO_EXPERT)}
              className="px-6 py-4 bg-blue-600 text-white rounded-xl font-bold"
            >
              Schedule Discovery Call
            </button>
          </div>
        </div>

        <div className="mt-16 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} LIBEY BUILDTECH. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
