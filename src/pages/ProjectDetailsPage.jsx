import { useParams, Link } from 'react-router-dom';
import BackgroundEffects from '../components/BackgroundEffects';
import TechTag from '../components/TechTag';
import FloatingChat from '../components/FloatingChat';
import { getProjectById, projects } from '../data/projects';

function ProjectDetailsPage() {
  const { id } = useParams();
  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="relative flex min-h-screen w-full flex-col">
        <BackgroundEffects />
        <main className="flex-grow pt-32 pb-20 px-6 relative z-10 w-full max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
            <Link to="/projects" className="text-ai-accent hover:text-white transition-colors">
              Return to Projects
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const navigableProjects = projects.filter(p => !p.isPlaceholder);
  const currentIndex = navigableProjects.findIndex(p => p.id === id);
  const prevProject = currentIndex > 0 ? navigableProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < navigableProjects.length - 1 ? navigableProjects[currentIndex + 1] : null;

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <BackgroundEffects />
      <main className="flex-grow pt-32 pb-20 px-6 relative z-10 w-full max-w-7xl mx-auto">
        <div className="mb-8 flex items-center gap-2 text-xs font-mono text-text-secondary">
          <Link to="/" className="hover:text-ai-accent transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <Link to="/projects" className="hover:text-ai-accent transition-colors">Projects</Link>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-white">{project.title}</span>
        </div>
        <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 glass-panel mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-surface-darker/90 via-surface-darker/80 to-surface-darker/40 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 opacity-40"
            style={{ backgroundImage: `url('${project.image}')` }}
          ></div>
          <div className="relative z-20 p-8 md:p-12 lg:p-16 flex flex-col gap-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai-accent/10 border border-ai-accent/20 text-xs font-mono text-ai-accent w-fit">
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
              {project.category.toUpperCase()} SOLUTION
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              {project.title.split(' ').slice(0, -1).join(' ')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-accent to-primary text-glow">{project.title.split(' ').slice(-1).join(' ')}</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl font-body leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-8">
            {project.client && (
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-6 pb-4 border-b border-white/5">Project Details</h3>
                <div className="space-y-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-text-secondary font-mono">CLIENT</span>
                    <span className="text-base font-medium text-white">{project.client}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-text-secondary font-mono">TIMELINE</span>
                    <span className="text-base font-medium text-white">{project.timeline}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-text-secondary font-mono">ROLE</span>
                    <span className="text-base font-medium text-white">{project.role}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-text-secondary font-mono">TEAM SIZE</span>
                    <span className="text-base font-medium text-white">{project.teamSize}</span>
                  </div>
                </div>
              </div>
            )}
            {project.techStack && (
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-sm font-mono text-text-secondary uppercase tracking-wider mb-6 pb-4 border-b border-white/5">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <TechTag key={index} name={tech.name} color={tech.color} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-8 space-y-12">
            {project.problem && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 rounded-lg bg-surface-dark border border-white/5 text-ai-accent">
                    <span className="material-symbols-outlined text-xl">psychology_alt</span>
                  </span>
                  <h2 className="text-2xl font-bold text-white font-display">The Problem Statement</h2>
                </div>
                <div className="prose prose-invert prose-lg text-text-secondary leading-relaxed font-body">
                  <p>{project.problem}</p>
                </div>
              </section>
            )}
            {project.solution && (
              <>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="p-2 rounded-lg bg-surface-dark border border-white/5 text-primary">
                      <span className="material-symbols-outlined text-xl">hub</span>
                    </span>
                    <h2 className="text-2xl font-bold text-white font-display">The Solution</h2>
                  </div>
                  <p className="text-text-secondary leading-relaxed mb-8 font-body">
                    {project.solution}
                  </p>
                  <div className="w-full rounded-xl bg-surface-darker border border-white/10 p-6 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[size:20px_20px] bg-grid-pattern opacity-10"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 py-8 px-4">
                      <div className="flex flex-col items-center gap-2 w-32">
                        <div className="w-16 h-16 rounded-xl bg-surface-dark border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                          <span className="material-symbols-outlined text-2xl text-text-secondary">person</span>
                        </div>
                        <span className="text-[10px] font-mono text-text-secondary uppercase">Analyst</span>
                      </div>
                      <div className="h-0.5 w-12 bg-white/10 md:block hidden relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-white/10 rotate-45"></div>
                      </div>
                      <span className="material-symbols-outlined text-white/20 md:hidden">arrow_downward</span>
                      <div className="flex flex-col items-center gap-2 relative">
                        <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full animate-pulse-slow"></div>
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-surface-dark to-surface-darker border border-ai-accent/30 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                          <span className="material-symbols-outlined text-3xl text-ai-accent">smart_toy</span>
                        </div>
                        <span className="text-[10px] font-mono text-ai-accent uppercase font-bold">Orchestrator Agent</span>
                      </div>
                      <div className="h-0.5 w-12 bg-white/10 md:block hidden relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-white/10 rotate-45"></div>
                      </div>
                      <span className="material-symbols-outlined text-white/20 md:hidden">arrow_downward</span>
                      <div className="flex flex-col items-center gap-2 w-32">
                        <div className="w-16 h-16 rounded-xl bg-surface-dark border border-white/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl text-purple-400">database</span>
                        </div>
                        <span className="text-[10px] font-mono text-text-secondary uppercase">Vector Knowledge</span>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <span className="text-[10px] text-text-secondary italic">System Architecture High-Level Overview</span>
                    </div>
                  </div>
                </section>
              </>
            )}
            {project.modules && (
              <section>
                <h3 className="text-lg font-bold text-white font-display mb-4">Key Implementation Modules</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.modules.map((module, index) => (
                    <div key={index} className="glass-panel p-4 rounded-lg hover:border-ai-accent/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <span className={`material-symbols-outlined ${module.color} mt-1`}>{module.icon}</span>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1">{module.title}</h4>
                          <p className="text-xs text-text-secondary leading-relaxed">{module.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {project.outcomes && (
              <section className="mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-2 rounded-lg bg-surface-dark border border-white/5 text-emerald-400">
                    <span className="material-symbols-outlined text-xl">trending_up</span>
                  </span>
                  <h2 className="text-2xl font-bold text-white font-display">Project Outcomes</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.outcomes.map((outcome, index) => {
                    const colors = [
                      'from-transparent via-ai-accent to-transparent',
                      'from-transparent via-primary to-transparent',
                      'from-transparent via-purple-500 to-transparent',
                    ];
                    return (
                      <div key={index} className="glass-panel rounded-xl p-6 text-center relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors[index]}`}></div>
                        <span className="block text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">{outcome.value}</span>
                        <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">{outcome.label}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
            <div className="flex justify-between mt-16 pt-8 border-t border-white/5">
              {prevProject ? (
                <Link to={`/projects/${prevProject.id}`} className="group flex flex-col items-start gap-1">
                  <span className="text-[10px] font-mono text-text-secondary uppercase">Previous Project</span>
                  <span className="text-lg font-bold text-white group-hover:text-ai-accent transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">arrow_back</span>
                    {prevProject.title}
                  </span>
                </Link>
              ) : (
                <div></div>
              )}
              {nextProject && (
                <Link to={`/projects/${nextProject.id}`} className="group flex flex-col items-end gap-1">
                  <span className="text-[10px] font-mono text-text-secondary uppercase">Next Project</span>
                  <span className="text-lg font-bold text-white group-hover:text-ai-accent transition-colors flex items-center gap-2">
                    {nextProject.title}
                    <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      <FloatingChat project={project} />
    </div>
  );
}

export default ProjectDetailsPage;

