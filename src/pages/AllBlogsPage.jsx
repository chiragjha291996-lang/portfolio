import { useState } from 'react';
import BackgroundEffects from '../components/BackgroundEffects';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogs';

function AllBlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const filteredPosts = sortedPosts.filter((post) => {
    if (searchQuery === '') return true;
    const q = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <BackgroundEffects />
      <main className="flex-grow pt-32 pb-24 px-6 relative z-10 w-full max-w-7xl mx-auto">
        <div
          className="flex flex-col gap-6 mb-12 relative animate-expand-width opacity-0"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-ai-accent w-fit animate-pulse-slow">
            <span className="w-1.5 h-1.5 rounded-full bg-ai-accent"></span>
            BLOG_FEED_v1.0
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">
            Thoughts &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ai-accent via-white to-primary text-glow">
              Writings.
            </span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl font-body leading-relaxed">
            Reflections on AI product management, strategy, and building
            intelligent systems in the real world.
          </p>
        </div>

        <div
          className="w-full mb-16 relative z-20 opacity-0"
          style={{ animation: 'expandWidth 0.8s ease-out 0.3s forwards' }}
        >
          <div className="relative glass-panel rounded-xl overflow-hidden shadow-lg p-1">
            <div className="relative flex items-center w-full bg-surface-darker/80 rounded-lg overflow-hidden border border-white/5 transition-colors">
              <span className="material-symbols-outlined text-text-secondary pl-4 text-xl">
                search
              </span>
              <input
                className="w-full bg-transparent border-none py-4 pl-3 pr-4 text-sm md:text-base text-white placeholder-text-secondary/50 focus:ring-0 font-mono"
                placeholder="Search posts by title, topic, or tag..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">
              No posts found matching your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AllBlogsPage;
