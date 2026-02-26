import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api, BlogPost } from '../../services/api';
import { PageLoading } from './loading';

export function LatestBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getBlogPosts();
        setPosts(data.slice(0, 3)); // Get first 3 posts
      } catch (err) {
        console.error('Failed to fetch blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <PageLoading />;
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#0a0e27]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Insights
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts on cybersecurity, technology trends, and best practices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="bg-white dark:bg-[#151933] rounded-xl overflow-hidden border border-gray-200 dark:border-[#00d4ff]/10 hover:border-[#00d4ff]/30 transition-all hover:shadow-lg hover:shadow-[#00d4ff]/10 h-full flex flex-col">
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-[#1e2443] to-[#151933]">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-600">No Image</span>
                      </div>
                    )}
                  </div>
                  <div
                    className="p-6 flex-1 flex flex-col"
                    lang={post.content_language}
                    dir={post.content_language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.published_date).toLocaleDateString()}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                    </div>
                    <span className="inline-block px-3 py-1 bg-[#00d4ff]/10 text-[#00d4ff] text-xs rounded-full mb-3 w-fit">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                      {post.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 flex-1">
                      {post.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[#00d4ff] text-sm font-medium">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#00d4ff] text-[#00d4ff] rounded-lg font-semibold hover:bg-[#00d4ff] hover:text-[#0a0e27] transition-all"
          >
            Read All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
