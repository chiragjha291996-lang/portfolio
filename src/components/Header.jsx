import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerBarRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const measureHeader = useCallback(() => {
    if (headerBarRef.current) {
      setHeaderHeight(headerBarRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    measureHeader();
    window.addEventListener('resize', measureHeader);
    return () => window.removeEventListener('resize', measureHeader);
  }, [measureHeader]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.inset = '0';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.inset = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.inset = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: location.pathname.startsWith('/projects/') ? 'Expertise' : 'Projects' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        ref={headerBarRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-surface-darker/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
      >
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-primary via-ai-accent to-primary p-[1.5px] animate-shimmer bg-[length:200%_100%]">
              <div className="w-full h-full rounded-full bg-surface-darker flex items-center justify-center backdrop-blur-sm">
                <span className="material-symbols-outlined text-sm text-white group-hover:text-ai-accent transition-colors">smart_toy</span>
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-surface-darker rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white leading-none group-hover:text-ai-accent transition-colors font-display">Chirag Jha</span>
              <span className="text-[10px] font-mono text-text-secondary leading-none mt-1 group-hover:text-white transition-colors">AI CONSULTANT</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={`text-sm font-medium transition-colors relative group py-2 ${isActive(to) ? 'text-white' : 'text-text-secondary hover:text-white'}`}>
                {label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-ai-accent to-primary transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)] ${isActive(to) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white ml-auto p-2 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </header>

      {/* Mobile menu - rendered as sibling to avoid stacking context issues */}
      <div
        className={`md:hidden fixed inset-0 z-[45] transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ top: headerHeight }}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileMenuOpen(false)}
        />
        <nav className="relative bg-surface-darker/95 backdrop-blur-xl border-b border-white/10 flex flex-col gap-2 px-6 py-6">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`w-full text-center text-lg font-medium py-4 rounded-xl transition-all duration-200 ${
                isActive(to)
                  ? 'text-white bg-white/5 border border-ai-accent/30'
                  : 'text-text-secondary hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {label}
              {isActive(to) && (
                <span className="block mx-auto mt-2 w-8 h-0.5 bg-gradient-to-r from-ai-accent to-primary rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Header;

