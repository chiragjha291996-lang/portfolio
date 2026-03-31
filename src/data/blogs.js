export const blogPosts = [
  {
    slug: 'why-ai-needs-product-thinking',
    title: 'Why AI Projects Fail Without Product Thinking',
    date: '2026-03-12',
    description:
      'Most AI initiatives don\'t fail because of bad models — they fail because nobody asked the right questions before building. Here\'s what product thinking brings to the table.',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tags: ['AI', 'Product Management', 'Strategy'],
    readTime: '6 min read',
  },
];

export function getBlogBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) || null;
}
