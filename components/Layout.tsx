
import React from 'react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
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

    {/* The Bounding Hexagon Shape - Dark Background */}
    <path d="M10 30 L50 10 L90 30 V70 L50 90 L10 70 Z" fill="#020617" />
    
    {/* The 'L' - 3D Metallic Structure */}
    {/* Outer metallic bevel */}
    <path d="M28 22 V72 H62 V60 H40 V22 H28Z" fill="url(#lMetallic)" />
    {/* Inner blue face */}
    <path d="M35 25 V65 H58 V58 H42 V25 H35Z" fill="url(#lBlue)" />
    
    {/* The 'B' - Precise Wireframe Matching Logo */}
    <g stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#shadow)">
      {/* Top section of B */}
      <path d="M48 22 H75 L88 40 L70 50" />
      {/* Bottom section of B */}
      <path d="M70 50 L88 62 L75 78 H48" />
      {/* Vertical spine connecting nodes */}
      <path d="M48 22 V78" />
      {/* Middle horizontal bar */}
      <path d="M48 50 H70" />
    </g>
    
    {/* Nodes (Circles) - Precise Placement */}
    <g fill="#F8FAFC">
      <circle cx="48" cy="22" r="3" /> {/* Top Left of B */}
      <circle cx="75" cy="22" r="3" /> {/* Top Right Corner */}
      <circle cx="88" cy="40" r="3" /> {/* Middle Upper Right */}
      <circle cx="70" cy="50" r="3" /> {/* Middle Center Connector */}
      <circle cx="48" cy="50" r="3" /> {/* Middle Left of B */}
      <circle cx="88" cy="62" r="3" /> {/* Middle Lower Right */}
      <circle cx="75" cy="78" r="3" /> {/* Bottom Right Corner */}
      <circle cx="48" cy="78" r="3" /> {/* Bottom Left of B */}
    </g>
  </svg>
);

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
            <div className="flex items-center">
              <div 
                className="flex items-center cursor-pointer group" 
                onClick={() => setActiveTab(AppTab.HOME)}
              >
                <Logo className="w-14 h-14 mr-4 drop-shadow-xl group-hover:scale-105 transition-transform duration-300" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
                    LIBEY
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.4em] text-blue-600 leading-none mt-1 uppercase">
                    BuildTech
                  </span>
                </div>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
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
                className="ml-6 px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
              >
                Schedule Call
              </button>
            </div>

            {/* Mobile Nav Button */}
            <div className="lg:hidden flex items-center">
              <button 
                className="text-slate-600 p-2"
                onClick={() => {
                  const el = document.getElementById('mobile-menu');
                  el?.classList.toggle('hidden');
                }}
              >
                <i className="fa-solid fa-bars-staggered text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden lg:hidden border-t border-slate-200 bg-white animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  document.getElementById('mobile-menu')?.classList.add('hidden');
                }}
                className={`block w-full text-left px-3 py-4 rounded-md text-base font-bold ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <div className="pt-4 px-3">
              <button 
                onClick={() => {
                  setActiveTab(AppTab.TALK_TO_EXPERT);
                  document.getElementById('mobile-menu')?.classList.add('hidden');
                }}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-center"
              >
                Schedule Discovery Call
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <div className="flex items-center mb-8 group cursor-pointer" onClick={() => setActiveTab(AppTab.HOME)}>
                <Logo className="w-12 h-12 mr-4 group-hover:opacity-80 transition-opacity" />
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter text-white leading-none uppercase">
                    Libey
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.3em] text-blue-400 leading-none mt-1 uppercase">
                    BuildTech
                  </span>
                </div>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed max-w-sm mb-8">
                A specialist BIM-led planning and cost-control consultancy. We protect your project's financial integrity through digital validation before construction begins.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
                  <i className="fa-solid fa-envelope"></i>
                </a>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">Consultancy</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><button onClick={() => setActiveTab(AppTab.SERVICES)} className="hover:text-blue-400 transition-colors">Services</button></li>
                <li><button onClick={() => setActiveTab(AppTab.HOW_IT_WORKS)} className="hover:text-blue-400 transition-colors">Methodology</button></li>
                <li><button onClick={() => setActiveTab(AppTab.CASE_EXAMPLE)} className="hover:text-blue-400 transition-colors">Outcomes</button></li>
                <li><button onClick={() => setActiveTab(AppTab.PRICING)} className="hover:text-blue-400 transition-colors">Approach</button></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">Resources</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><button onClick={() => setActiveTab(AppTab.PRODUCTS)} className="hover:text-blue-400 transition-colors">Digital Tools</button></li>
                <li><button onClick={() => setActiveTab(AppTab.RESOURCES)} className="hover:text-blue-400 transition-colors">Insights</button></li>
                <li><button onClick={() => setActiveTab(AppTab.TALK_TO_EXPERT)} className="hover:text-blue-400 transition-colors">Discovery Call</button></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">Contact</h4>
              <p className="text-sm leading-relaxed mb-6">
                Supporting developers and architects across US-based and international real estate workflows.
              </p>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Direct Inquiry</span>
                <span className="text-white font-bold text-sm">expert@libeybuildtech.com</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-[12px] font-medium tracking-wide">
            <p>&copy; {new Date().getFullYear()} LIBEY BUILDTECH CONSULTANCY. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-8 mt-6 md:mt-0 text-slate-600">
              <a href="#" className="hover:text-white transition-colors uppercase">Terms of Engagement</a>
              <a href="#" className="hover:text-white transition-colors uppercase">Privacy & Data Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
