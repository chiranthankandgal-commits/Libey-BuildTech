import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Libey BuildTech"
              className="h-10 w-auto"
            />
            <span className="font-semibold text-lg">
              Libey BuildTech
            </span>
          </div>

          <nav className="text-sm flex gap-6">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm">
        <div className="space-y-2">
          <div>
            📧{" "}
            <a
              href="mailto:expert@libeybuildtech.com"
              className="underline"
            >
              expert@libeybuildtech.com
            </a>
          </div>
          <div>
            🔗{" "}
            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
