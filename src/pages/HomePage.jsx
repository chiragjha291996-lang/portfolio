import { Link } from 'react-router-dom';
import BackgroundEffects from '../components/BackgroundEffects';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

function HomePage() {
  const featuredProjects = projects.filter(p => !p.isPlaceholder).slice(0, 3);

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <BackgroundEffects />
      <main className="flex-grow pt-32 pb-10 px-6 flex flex-col items-center relative z-10 w-full max-w-7xl mx-auto">
        <div className="text-center max-w-5xl mx-auto flex flex-col items-center gap-8 mb-16 mt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-ai-accent animate-pulse-slow">
            <span className="w-1.5 h-1.5 rounded-full bg-ai-accent"></span>
            AVAILABLE FOR NEW OPPORTUNITIES
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-white">
            Scaling <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-accent via-white to-primary text-glow">Intelligence.</span><br/>
            Managing <span className="text-text-secondary">Complexity.</span>
          </h1>
          <p className="text-text-secondary text-lg sm:text-xl max-w-2xl font-body leading-relaxed">
            Senior Consultant at PwC. Architecting the future at the intersection of Generative AI, Product Strategy, and Enterprise Transformation.
          </p>
        </div>
        <div className="w-full max-w-2xl relative group perspective-1000 mx-auto z-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-ai-accent to-primary rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse-slow"></div>
          <div className="relative glass-panel rounded-xl overflow-hidden shadow-2xl flex flex-col p-1 animate-expand-width mx-auto">
            <div className="relative flex items-center w-full bg-surface-darker/80 rounded-lg overflow-hidden border border-white/5">
              <span className="material-symbols-outlined text-text-secondary pl-4 text-xl">temp_preferences_custom</span>
              <input 
                className="w-full bg-transparent border-none py-4 pl-3 pr-14 text-base text-white placeholder-text-secondary/50 focus:ring-0 font-body" 
                placeholder="Ask my digital twin about my experience..." 
                type="text"
              />
              <button className="absolute right-2 p-2 bg-gradient-to-r from-primary to-ai-accent hover:opacity-90 text-white rounded-lg transition-all flex items-center justify-center shadow-lg shadow-ai-accent/20">
                <span className="material-symbols-outlined text-lg">arrow_upward</span>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6 opacity-0 animate-[float_1s_ease-out_0.5s_forwards] fill-mode-forwards" style={{animationFillMode: 'forwards'}}>
            <button className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-ai-accent/50 hover:bg-white/10 text-xs font-mono text-text-secondary hover:text-white transition-all cursor-pointer flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">history_edu</span> Strategy projects
            </button>
            <button className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-ai-accent/50 hover:bg-white/10 text-xs font-mono text-text-secondary hover:text-white transition-all cursor-pointer flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">groups</span> Program management work
            </button>
            <button className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-ai-accent/50 hover:bg-white/10 text-xs font-mono text-text-secondary hover:text-white transition-all cursor-pointer flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">rocket_launch</span> Personal projects
            </button>
          </div>
        </div>
        <div className="w-full max-w-7xl mt-24 border-t border-white/5"></div>
      </main>
      <section className="w-full bg-surface-darker py-24 px-6 relative" id="expertise">
        <div className="absolute inset-0 bg-[size:40px_40px] bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                Career <span className="text-ai-accent">Highlights</span>
              </h2>
              <p className="text-text-secondary text-lg max-w-xl font-body">
                Delivering complex AI solutions from 0 to 1 across strategy, program management, and personal ventures.
              </p>
            </div>
            <Link 
              to="/projects"
              className="group text-white font-mono text-sm font-bold border border-white/10 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 hover:border-ai-accent/50 transition-all flex items-center gap-2"
            >
              VIEW_ALL_PROJECTS <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} showFullHeight={true} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

