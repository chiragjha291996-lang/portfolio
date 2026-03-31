import { useNavigate } from 'react-router-dom';

function ProjectCard({ project, showFullHeight = false }) {
  const navigate = useNavigate();

  if (project.isPlaceholder) {
    return (
      <div
        className={`group relative glass-panel rounded-2xl overflow-hidden flex flex-col ${showFullHeight ? 'h-full' : ''} cursor-default`}
      >
        <div className="relative h-48 overflow-hidden w-full border-b border-white/5">
          <div className="absolute inset-0 bg-surface-darker flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-white/10">construction</span>
          </div>
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-surface-darker/90 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono text-ai-accent uppercase tracking-wider shadow-lg">
              {project.category}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow relative">
          <h3 className="text-xl font-bold text-white/30 font-display">
            {project.title}
          </h3>
          <p className="text-text-secondary/50 text-sm mt-3 leading-relaxed">
            {project.description}
          </p>
          <div className="mt-auto pt-6 flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span key={index} className="text-[10px] font-mono text-text-secondary/40 border border-white/5 bg-white/[0.02] px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className={`group relative glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col ${showFullHeight ? 'h-full' : ''} cursor-pointer transition-transform duration-500 hover:-translate-y-1`}
    >
      <div className="relative h-48 overflow-hidden w-full border-b border-white/5">
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-all z-10"></div>
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${project.image}')` }}
        ></div>
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-surface-darker/90 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono text-ai-accent uppercase tracking-wider shadow-lg">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow relative">
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-all"></div>
        <h3 className="text-xl font-bold text-white group-hover:text-ai-accent transition-colors font-display">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm mt-3 leading-relaxed">
          {project.description}
        </p>
        <div className="mt-auto pt-6 flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span key={index} className="text-[10px] font-mono text-text-secondary border border-white/10 bg-white/5 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
