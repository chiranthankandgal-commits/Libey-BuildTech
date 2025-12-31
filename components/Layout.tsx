
import React from 'react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

/* =======================
   Logo Component
   ======================= */
const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  const [imgError, setImgError] = React.useState(false);
  const src = '/logo.png';

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

  // SVG fallback (unchanged)
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lMetallic" x1="20" y1="20" x2="60" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="50%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id="lBlue" x1="38" y1="25" x2="38" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="1" dy="1" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d="M10 30 L50 10 L90 30 V70 L50 90 L10 70 Z" fill="#020617" />
      <path d="M28 22 V72 H62 V60 H40 V22 H28Z" fill="url(#lMetallic)" />
      <path d="M35 25 V65 H58 V58 H42 V25 H35Z" fill="url(#lBlue)" />

      <g stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#shadow)">
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

/* =======================
   Layout Component
   ======================= */
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
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center cursor-pointer group" onClick={() => setActiveTab(AppTab.HOME)}>
              <Logo className="w-14 h-14 mr-4 drop-shadow-xl group-hover:scale-105 transition-transform duration-300" />
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">LIBEY</span>
                <span className="text-[10px] font-bold tracking-[0.4em] text-blue-600 mt-1 uppercase">BuildTech</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold ${
                    activeTab === tab.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={() => setActiveTab(AppTab.TALK_TO_EXPERT)}
                className="ml-6 px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold"
              >
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="bg-slate-950 text-slate-500 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm text-slate-400">
            Contact: <strong className="text-white">libeybuildtech@gmail.com</strong>
          </p>
          <p className="mt-6 text-xs">
            © {new Date().getFullYear()} LIBEY BUILDTECH CONSULTANCY. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
