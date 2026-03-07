import { useState } from 'react';
import BackgroundEffects from '../components/BackgroundEffects';
import ProjectCard from '../components/ProjectCard';
import { projects, CATEGORIES } from '../data/projects';

const FILTER_TABS = [
  CATEGORIES.ALL,
  CATEGORIES.PROGRAM_MANAGEMENT,
  CATEGORIES.STRATEGY,
  CATEGORIES.PERSONAL_PROJECT,
];

function AllProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState(CATEGORIES.ALL);

  const filteredProjects = projects.filter(project => {
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
        <div className="w-full mb-16 relative z-20 animate-[float_4s_ease-in-out_infinite] opacity-0" style={{animation: 'expandWidth 0.8s ease-out 0.3s forwards'}}>
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
                {FILTER_TABS.map((tab) => (
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
            {FILTER_TABS.map((tab) => (
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
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">No projects found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AllProjectsPage;
