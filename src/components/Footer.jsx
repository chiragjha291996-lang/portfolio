function Footer() {
  return (
    <footer className="bg-surface-darker py-12 border-t border-white/10 px-6 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[size:40px_40px] bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-ai-accent shadow-[0_0_8px_rgba(6,182,212,0.6)]"></span>
            <span className="text-sm font-bold text-white font-display">Chirag Jha</span>
          </div>
          <span className="text-xs text-text-secondary font-mono">Architecting Intelligence.</span>
        </div>
        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          <a href="mailto:chiragjha291996@gmail.com" className="text-text-secondary text-xs font-mono uppercase tracking-wider hover:text-ai-accent transition-colors flex items-center gap-2 group">
            chiragjha291996@gmail.com
            <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all text-ai-accent">arrow_outward</span>
          </a>
          <a href="tel:+917259918923" className="text-text-secondary text-xs font-mono uppercase tracking-wider hover:text-ai-accent transition-colors flex items-center gap-2 group">
            +91 72599 18923
            <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all text-ai-accent">arrow_outward</span>
          </a>
          <a href="https://www.linkedin.com/in/chiragjha" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-xs font-mono uppercase tracking-wider hover:text-ai-accent transition-colors flex items-center gap-2 group">
            LinkedIn
            <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all text-ai-accent">arrow_outward</span>
          </a>
          <a href="https://chiragjha1996.wordpress.com" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-xs font-mono uppercase tracking-wider hover:text-ai-accent transition-colors flex items-center gap-2 group">
            Blog
            <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all text-ai-accent">arrow_outward</span>
          </a>
          <a href="https://github.com/chiragjha291996-lang/all_projects" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-xs font-mono uppercase tracking-wider hover:text-ai-accent transition-colors flex items-center gap-2 group">
            GitHub
            <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all text-ai-accent">arrow_outward</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

