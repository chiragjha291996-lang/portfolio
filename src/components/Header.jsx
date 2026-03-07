import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-surface-darker/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
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
          <Link to="/" className={`text-sm font-medium transition-colors relative group py-2 ${isActive('/') ? 'text-white' : 'text-text-secondary hover:text-white'}`}>
            Home
            {isActive('/') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-ai-accent to-primary transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
            )}
            {!isActive('/') && (
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-ai-accent to-primary transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
            )}
          </Link>
          <Link to="/projects" className={`text-sm font-medium transition-colors relative group py-2 ${isActive('/projects') ? 'text-white' : 'text-text-secondary hover:text-white'}`}>
            {location.pathname.startsWith('/projects/') ? 'Expertise' : 'Projects'}
            {isActive('/projects') && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-ai-accent to-primary transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
            )}
            {!isActive('/projects') && (
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-ai-accent to-primary transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
            )}
          </Link>
          <a href="#" className="text-sm font-medium text-text-secondary hover:text-white transition-colors relative group py-2">
            Philosophy
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-ai-accent to-primary transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
          </a>
          <a href="#" className="text-sm font-medium text-text-secondary hover:text-white transition-colors relative group py-2">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-ai-accent to-primary transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
          </a>
        </nav>
        <button className="md:hidden text-white ml-auto p-2 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/10">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}

export default Header;

