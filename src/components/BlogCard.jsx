import { useNavigate } from 'react-router-dom';

function BlogCard({ post }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${post.slug}`)}
      className="group relative glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden w-full border-b border-white/5">
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-all z-10"></div>
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${post.coverImage}')` }}
        ></div>
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-surface-darker/90 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono text-ai-accent uppercase tracking-wider shadow-lg">
            {post.readTime}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative">
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-all"></div>

        <time className="text-[11px] font-mono text-text-secondary mb-2">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>

        <h3 className="text-xl font-bold text-white group-hover:text-ai-accent transition-colors font-display leading-tight">
          {post.title}
        </h3>

        <p className="text-text-secondary text-sm mt-3 leading-relaxed line-clamp-3">
          {post.description}
        </p>

        <div className="mt-auto pt-5 flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="text-[10px] font-mono text-text-secondary border border-white/10 bg-white/5 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs font-mono text-ai-accent group-hover:text-white transition-colors">
          <span>Read article</span>
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
