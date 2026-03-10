import { Link } from 'react-router-dom';
import BackgroundEffects from '../components/BackgroundEffects';

function ContactPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <BackgroundEffects />
      <main className="flex-grow pt-32 pb-20 px-6 relative z-10 w-full max-w-7xl mx-auto">
        <div className="mb-8 flex items-center gap-2 text-xs font-mono text-text-secondary">
          <Link to="/" className="hover:text-ai-accent transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-white">Contact</span>
        </div>
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-ai-accent w-fit mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-ai-accent"></span>
            GET IN TOUCH
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 font-display">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-accent to-primary">Chirag</span>
          </h1>
          <p className="text-text-secondary text-lg font-body leading-relaxed mb-12">
            Available for new opportunities. Reach out via email, phone, or connect on LinkedIn.
          </p>
          <div className="space-y-6">
            <a
              href="mailto:chiragjha291996@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-white/10 hover:border-ai-accent/30 transition-colors group"
            >
              <span className="p-2 rounded-lg bg-surface-dark border border-white/5 text-ai-accent group-hover:bg-ai-accent/10 transition-colors">
                <span className="material-symbols-outlined text-xl">mail</span>
              </span>
              <div>
                <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block mb-0.5">Email</span>
                <span className="text-white font-medium group-hover:text-ai-accent transition-colors">chiragjha291996@gmail.com</span>
              </div>
              <span className="material-symbols-outlined text-text-secondary ml-auto group-hover:text-ai-accent transition-colors">arrow_outward</span>
            </a>
            <a
              href="tel:+917259918923"
              className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-white/10 hover:border-ai-accent/30 transition-colors group"
            >
              <span className="p-2 rounded-lg bg-surface-dark border border-white/5 text-ai-accent group-hover:bg-ai-accent/10 transition-colors">
                <span className="material-symbols-outlined text-xl">phone</span>
              </span>
              <div>
                <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block mb-0.5">Phone</span>
                <span className="text-white font-medium group-hover:text-ai-accent transition-colors">+91 72599 18923</span>
              </div>
              <span className="material-symbols-outlined text-text-secondary ml-auto group-hover:text-ai-accent transition-colors">arrow_outward</span>
            </a>
            <a
              href="https://www.linkedin.com/in/chiragjha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-white/10 hover:border-ai-accent/30 transition-colors group"
            >
              <span className="p-2 rounded-lg bg-surface-dark border border-white/5 text-ai-accent group-hover:bg-ai-accent/10 transition-colors">
                <span className="material-symbols-outlined text-xl">link</span>
              </span>
              <div>
                <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block mb-0.5">LinkedIn</span>
                <span className="text-white font-medium group-hover:text-ai-accent transition-colors">linkedin.com/in/chiragjha</span>
              </div>
              <span className="material-symbols-outlined text-text-secondary ml-auto group-hover:text-ai-accent transition-colors">arrow_outward</span>
            </a>
            <a
              href="https://chiragjha1996.wordpress.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-white/10 hover:border-ai-accent/30 transition-colors group"
            >
              <span className="p-2 rounded-lg bg-surface-dark border border-white/5 text-ai-accent group-hover:bg-ai-accent/10 transition-colors">
                <span className="material-symbols-outlined text-xl">article</span>
              </span>
              <div>
                <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block mb-0.5">Blog</span>
                <span className="text-white font-medium group-hover:text-ai-accent transition-colors">chiragjha1996.wordpress.com</span>
              </div>
              <span className="material-symbols-outlined text-text-secondary ml-auto group-hover:text-ai-accent transition-colors">arrow_outward</span>
            </a>
            <a
              href="https://github.com/chiragjha291996-lang/all_projects"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl glass-panel border border-white/10 hover:border-ai-accent/30 transition-colors group"
            >
              <span className="p-2 rounded-lg bg-surface-dark border border-white/5 text-ai-accent group-hover:bg-ai-accent/10 transition-colors">
                <span className="material-symbols-outlined text-xl">code</span>
              </span>
              <div>
                <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block mb-0.5">GitHub</span>
                <span className="text-white font-medium group-hover:text-ai-accent transition-colors">github.com/chiragjha291996-lang/all_projects</span>
              </div>
              <span className="material-symbols-outlined text-text-secondary ml-auto group-hover:text-ai-accent transition-colors">arrow_outward</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ContactPage;
