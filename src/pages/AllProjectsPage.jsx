import { useState } from 'react';
import BackgroundEffects from '../components/BackgroundEffects';
import ProjectCard from '../components/ProjectCard';
import { projects, CATEGORIES } from '../data/projects';

const WORK_FILTER_TABS = [
  CATEGORIES.ALL,
  CATEGORIES.PROGRAM_MANAGEMENT,
  CATEGORIES.STRATEGY,
];

function AllProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState(CATEGORIES.ALL);

  const personalProjects = projects.filter(p => p.category === CATEGORIES.PERSONAL_PROJECT);
  const workProjects = projects.filter(p => p.category !== CATEGORIES.PERSONAL_PROJECT);

  const filteredWorkProjects = workProjects.filter(project => {
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filter === CATEGORIES.ALL || project.category === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <BackgroundEffects />
      <main className="flex-grow pt-32 pb-24 px-6 relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-12 relative animate-expand-width opacity-0" style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-ai-accent w-fit animate-pulse-slow">
            <span className="w-1.5 h-1.5 rounded-full bg-ai-accent"></span>
            PROJECT_ARCHIVE_v2.4
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-accent via-white to-primary text-glow">Works.</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl font-body leading-relaxed">
            A curated list of AI implementations across various sectors. Each project represents a unique challenge in bringing intelligence to complex systems.
          </p>
        </div>

        {/* Personal Projects Section */}
        {personalProjects.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="p-2 rounded-lg bg-surface-dark border border-white/5 text-ai-accent">
                <span className="material-symbols-outlined text-xl">science</span>
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white font-display">Personal Projects</h2>
                <p className="text-xs font-mono text-text-secondary mt-0.5">Research-driven builds & side ventures</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16"></div>

        {/* Professional Work Section */}
        <div className="flex items-center gap-3 mb-8">
          <span className="p-2 rounded-lg bg-surface-dark border border-white/5 text-primary">
            <span className="material-symbols-outlined text-xl">work</span>
          </span>
          <div>
            <h2 className="text-2xl font-bold text-white font-display">Professional Work</h2>
            <p className="text-xs font-mono text-text-secondary mt-0.5">Enterprise engagements & consulting</p>
          </div>
        </div>

        <div className="w-full mb-10 relative z-20 animate-[float_4s_ease-in-out_infinite] opacity-0" style={{animation: 'expandWidth 0.8s ease-out 0.3s forwards'}}>
          <div className="relative glass-panel rounded-xl overflow-hidden shadow-lg p-1">
            <div className="relative flex items-center w-full bg-surface-darker/80 rounded-lg overflow-hidden border border-white/5 group-focus-within:border-ai-accent/30 transition-colors">
              <span className="material-symbols-outlined text-text-secondary pl-4 text-xl">filter_list</span>
              <input
                className="w-full bg-transparent border-none py-4 pl-3 pr-4 text-sm md:text-base text-white placeholder-text-secondary/50 focus:ring-0 font-mono"
                placeholder="Filter projects by technology (e.g., RAG, LLM), industry, or outcome..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="hidden md:flex items-center pr-2 gap-2">
                {WORK_FILTER_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition-all whitespace-nowrap ${
                      filter === tab
                        ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                        : 'bg-transparent hover:bg-white/5 border-transparent text-text-secondary hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Mobile filter tabs */}
          <div className="flex md:hidden items-center gap-2 mt-3 overflow-x-auto pb-2">
            {WORK_FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg border text-xs transition-all whitespace-nowrap ${
                  filter === tab
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                    : 'bg-transparent hover:bg-white/5 border-white/5 text-text-secondary hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {filteredWorkProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">No projects found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AllProjectsPage;
