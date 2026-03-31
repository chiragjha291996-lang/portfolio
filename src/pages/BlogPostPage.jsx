import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import BackgroundEffects from '../components/BackgroundEffects';
import { getBlogBySlug, blogPosts } from '../data/blogs';

function BlogPostPage() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const post = getBlogBySlug(slug);

  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;

  useEffect(() => {
    if (!post) return;
    setLoading(true);
    setError(false);

    fetch(`/blog/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug, post]);

  if (!post) {
    return (
      <div className="relative flex min-h-screen w-full flex-col">
        <BackgroundEffects />
        <main className="flex-grow pt-32 pb-20 px-6 relative z-10 w-full max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Post Not Found
            </h1>
            <Link
              to="/blog"
              className="text-ai-accent hover:text-white transition-colors"
            >
              Return to Blog
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <BackgroundEffects />
      <main className="flex-grow pt-32 pb-20 px-6 relative z-10 w-full max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-mono text-text-secondary">
          <Link to="/" className="hover:text-ai-accent transition-colors">
            Home
          </Link>
          <span className="material-symbols-outlined text-[10px]">
            chevron_right
          </span>
          <Link to="/blog" className="hover:text-ai-accent transition-colors">
            Blog
          </Link>
          <span className="material-symbols-outlined text-[10px]">
            chevron_right
          </span>
          <span className="text-white truncate max-w-[200px]">
            {post.title}
          </span>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-[10px] font-mono text-ai-accent border border-ai-accent/20 bg-ai-accent/10 px-2.5 py-1 rounded-full uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-[1.1] mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm font-mono text-text-secondary">
            <time>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="w-1 h-1 rounded-full bg-text-secondary/50"></span>
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 mb-12">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        )}

        {/* Content */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-ai-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-text-secondary">
              Failed to load blog content.
            </p>
          </div>
        )}

        {!loading && !error && (
          <article className="blog-prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
              {content}
            </ReactMarkdown>
          </article>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-white/5 gap-4">
          {prevPost ? (
            <Link
              to={`/blog/${prevPost.slug}`}
              className="group flex flex-col items-start gap-1 min-w-0 max-w-[45%]"
            >
              <span className="text-[10px] font-mono text-text-secondary uppercase">
                Previous Post
              </span>
              <span className="text-base sm:text-lg font-bold text-white group-hover:text-ai-accent transition-colors flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1 shrink-0">
                  arrow_back
                </span>
                <span className="truncate">{prevPost.title}</span>
              </span>
            </Link>
          ) : (
            <div></div>
          )}
          {nextPost && (
            <Link
              to={`/blog/${nextPost.slug}`}
              className="group flex flex-col items-end gap-1 min-w-0 max-w-[45%]"
            >
              <span className="text-[10px] font-mono text-text-secondary uppercase">
                Next Post
              </span>
              <span className="text-base sm:text-lg font-bold text-white group-hover:text-ai-accent transition-colors flex items-center gap-2 min-w-0">
                <span className="truncate">{nextPost.title}</span>
                <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1 shrink-0">
                  arrow_forward
                </span>
              </span>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

export default BlogPostPage;
